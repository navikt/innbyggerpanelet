import cors from 'cors';
import { Application, json } from 'express';
import expressSession from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import config from '../config';
import routes from '../routes';
export default ({ server }: { server: Application }) => {
    server.use(helmet());
    server.use(cors({ origin: config.frontend.url }));
    server.use(json());
    server.set('trust proxy', 1);
    // TODO: Secure version for prod (https)
    server.use(
        expressSession({
            secret: 'dan borge',
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
