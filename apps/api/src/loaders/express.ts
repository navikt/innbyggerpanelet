import redisStore from 'connect-redis';
import cors from 'cors';
import { Application, json } from 'express';
import expressSession, { MemoryStore } from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import { createClient } from 'redis';
import config from '../config';
import routes from '../routes';
export default ({ server }: { server: Application }) => {
    server.use(helmet());
    server.use(cors());
    server.use(json());
    server.set('trust proxy', 1);
    // TODO: Secure version for prod (https)
    server.use(
        expressSession({
            secret: 'dan borge',
            store: setupStore(),
            resave: false,
            saveUninitialized: false,
            unset: 'destroy',
            cookie: config.backend.prod
                ? {
                    sameSite: 'none',
                    secure: true,
                    domain: 'nav.no'
                }
                : { sameSite: 'lax', secure: false, domain: 'localhost' }
        })
    );
    server.use(passport.initialize());
    server.use(passport.session());
    server.use(routes);
};

const setupStore = () => {
    if (!config.backend.prod) return new MemoryStore();

    const client = createClient({
        legacyMode: true,
        url: `redis://${config.redis.host}:${config.redis.port}`
    });

    client.connect().catch((error) => console.log(error));

    const store = redisStore(expressSession);

    return new store({ client });
};
