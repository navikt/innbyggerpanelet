import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import session from 'express-session';
import { Issuer, Strategy, TokenSet } from 'openid-client';
import passport from 'passport';
import { database } from '.';
import config from '../config';
import { User } from '../models/user/UserEntity';
import { UserService } from '../services';

export interface IPassportSession extends session.Session {
    passport: {
        user: {
            claims: {
                oid: string;
                sid?: string;
                iss?: string;
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

            const userService = new UserService(database);
            const result: User = await userService
                .getById(user.claims.oid as string)
                .then((user) => {
                    return user;
                })
                .catch(async (error) => {
                    console.log('User does not exist.');

                    const dto: User = {
                        id: user.claims.oid as string,
                        name: user.claims.name,
                        email: user.claims.preferred_username,
                        phone: '12345678',
                        role: EnumUserRole.NAV,
                        latestUpdate: new Date().toISOString().slice(0, 10),
                        candidates: [],
                        criterias: [],
                        insightProjects: [],
                        messages: []
                    };
                    return await userService.create(dto);
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
            redirect_uris: [`${config.idPorten.redirectUri}/oauth2/callback`],
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

                console.log(user);
                if (user.claims.aud !== config.idPorten.clientId) return done(null, false);

                const userService = new UserService(database);
                const result: User = await userService
                    .getById(user.claims.pid as string)
                    .then((user) => {
                        return user;
                    })
                    .catch(async (error) => {
                        console.log('User does not exist.');

                        const dto: User = {
                            id: user.claims.pid as string,
                            name: 'IKKE SATT',
                            email: 'eksempeld@web.no',
                            phone: '12345678',
                            role: EnumUserRole.Citizen,
                            latestUpdate: new Date().toISOString().slice(0, 10),
                            candidates: [],
                            criterias: [],
                            insightProjects: []
                        };
                        return await userService.create(dto);
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
