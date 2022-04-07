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
            };
        };
    };
}

const passportLoader = async () => {
    const azureADIssuer = await Issuer.discover(
        `https://login.microsoftonline.com/${config.azureAd.tenantId}/v2.0/.well-known/openid-configuration`
    );

    const client = new azureADIssuer.Client({
        client_id: config.azureAd.clientId,
        client_secret: config.azureAd.secret,
        redirect_uris: ['http://localhost:2022/api/azure/oauth2/callback'],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post'
    });

    // Typescript does not recognize type here for some reason. Consider making an interface.
    passport.use(
        'azureAD',
        new Strategy({ client, usePKCE: 'S256' }, async (tokenSet: TokenSet, done) => {
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

            console.log(user.claims);

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
                        phone: 'temporary',
                        latestUpdate: new Date().toDateString(),
                        candidates: [],
                        criterias: [],
                        insightProjects: []
                    };
                    return await userService.create(dto);
                });

            if (result) return done(null, user);

            // Return error if user doesn't exist or isn't created.
            return done(true, null);
        })
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
