import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import session from 'express-session';
import { Issuer, Strategy, TokenSet } from 'openid-client';
import passport from 'passport';
import { database } from '.';
import config from '../config';
import { Citizen } from '../models/citizen/CitizenEntity';
import { Employee } from '../models/employee/EmployeeEntity';
import { CitizenService } from '../services/CitizenService';
import { EmployeeService } from '../services/EmployeeService';

export interface IPassportSession extends session.Session {
    passport: {
        user: {
            claims: {
                oid: string;
                pid: string;
                sid?: string;
                iss?: string;
                sub?: string;
            };
        };
    };
}

const passportLoader = async () => {
    const azureADIssuer = await Issuer.discover(
        `https://login.microsoftonline.com/${config.azureAd.tenantId}/v2.0/.well-known/openid-configuration`
    );

    const azureClient = new azureADIssuer.Client({
        client_id: config.azureAd.clientId,
        client_secret: config.azureAd.secret,
        redirect_uris: [`${config.backend.url}/api/azure/oauth2/callback`],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post'
    });

    // Typescript does not recognize type here for some reason. Consider making an interface.
    passport.use(
        'azureAD',
        new Strategy({ client: azureClient, usePKCE: 'S256' }, async (tokenSet: TokenSet, done) => {
            // Verify expiration
            if (tokenSet.expired()) return done(null, false);

            const user = {
                tokenSets: {
                    self: tokenSet
                },
                claims: tokenSet.claims()
            };

            // Verify AUD in claim
            if (user.claims.aud !== config.azureAd.clientId) return done(null, false);

            const employeeService = new EmployeeService(database);
            const result: Employee = await employeeService
                .getById(user.claims.oid as string)
                .then((user) => {
                    return user;
                })
                .catch(async (error) => {
                    console.log('Employee does not exist.');

                    const dto: Employee = {
                        id: user.claims.oid as string,
                        firstname: user.claims.name.split(',')[1],
                        surname: user.claims.name.split(',')[0],
                        email: user.claims.preferred_username,
                        role: EnumUserRole.InsightWorker,
                        registered: true,
                        ownerships: [],
                        insightProjects: [],
                        messages: []
                    };
                    return await employeeService.create(dto);
                });

            if (result) return done(null, user);

            // Return error if user doesn't exist or isn't created.
            return done(true, null);
        })
    );

    const idPortenIssuer = await Issuer.discover(config.idPorten.wellKnown);

    const idPortenClient = new idPortenIssuer.Client(
        {
            response_types: ['code'],
            client_id: config.idPorten.clientId,
            redirect_uris: [config.idPorten.redirectUri],
            scope: ['openid'],
            token_endpoint_auth_method: 'private_key_jwt',
            token_endpoint_auth_signing_alg: 'RS256',
            post_logout_redirect_uris: [idPortenIssuer.metadata.end_session_endpoint]
        },
        { keys: [config.idPorten.jwk] }
    );

    passport.use(
        'idPorten',
        new Strategy(
            {
                client: idPortenClient,
                usePKCE: 'S256',
                extras: { clientAssertionPayload: { aud: idPortenClient.issuer.metadata['token_endpoint'] } }
            },
            async (tokenSet: TokenSet, done) => {
                if (tokenSet.expired()) return done(null, false);

                const user = { tokenSets: { self: tokenSet }, claims: tokenSet.claims() };

                if (user.claims.aud !== config.idPorten.clientId) return done(null, false);

                const citizenService = new CitizenService(database);
                const result: Citizen = await citizenService
                    .getById(user.claims.sub as string)
                    .then((user) => {
                        return user;
                    })
                    .catch(async (error) => {
                        console.log('Citizen does not exist.');

                        const dto: Citizen = {
                            id: user.claims.sub as string,
                            pnr: user.claims.pid as string,
                            firstname: '',
                            surname: '',
                            phone: '',
                            registered: false,
                            role: EnumUserRole.Citizen,
                            expirationDate: new Date(
                                new Date().setFullYear(new Date().getFullYear() + 1)
                            ).toISOString(),
                            candidates: [],
                            criterias: [],
                            messages: []
                        };
                        return await citizenService.create(dto);
                    });

                if (result) return done(null, user);

                // Return error if user doesn't exist or isn't created.
                return done(true, null);
            }
        )
    );

    // serialize the user.id to save in the cookie session
    // so the browser will remember the user when login
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // deserialize the cookieUserId to user in the database
    passport.deserializeUser(async (user, done) => {
        done(null, user);
    });
};

export default passportLoader;
