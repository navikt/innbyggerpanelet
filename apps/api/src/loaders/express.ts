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
    server.set('trust proxy', 1);
    server.use(
        expressSession({
            secret: 'dan borge',
            store: await setupStore(),
            resave: false,
            saveUninitialized: false,
            unset: 'destroy',
            cookie: {
                sameSite: 'lax',
                secure: config.backend.prod,
                httpOnly: true,
                domain: config.backend.prod ? 'nav.no' : 'localhost'
            }
        })
    );
    server.use(helmet());
    server.use(
        cors({
            origin: '*',
            exposedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With'],
            credentials: true
        })
    );
    server.use(json());
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

    return new store({ client, disableTouch: false });
};
