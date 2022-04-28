import redisStore from 'connect-redis';
import cors from 'cors';
import { Application, json } from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { createClient } from 'redis';
import config from '../config';
import routes from '../routes';
export default async ({ server }: { server: Application }) => {
    server.use(helmet());
    server.use(cors({ exposedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With'] }));
    server.use(json());
    server.set('trust proxy', 1);
    // TODO: Secure version for prod (https)
    server.use(
        expressSession({
            secret: 'dan borge',
            store: await setupStore(),
            resave: false,
            saveUninitialized: false,
            unset: 'destroy',
            cookie: config.backend.prod
                ? {
                    sameSite: 'lax',
                    secure: true,
                    httpOnly: true
                }
                : { sameSite: 'lax', secure: false, httpOnly: true }
        })
    );
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(routes);
};

const setupStore = async () => {
    const client = createClient({
        legacyMode: true,
        socket: {
            host: config.redis.host,
            port: config.redis.port
        }
    });

    client.on('error', (err) => console.log('Redis Client Error', err));

    await client.connect();

    const store = redisStore(expressSession);

    return new store({ client, disableTouch: true });
};
