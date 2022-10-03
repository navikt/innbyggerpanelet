import cors from 'cors'
import { Application, json } from 'express'
import expressSession from 'express-session'
import helmet from 'helmet'
import passport from 'passport'
import config from '../config'
import routes from '../routes'

export default async ({ server }: { server: Application }) => {
    server.set('trust proxy', 1)

    if (process.env.IS_LABS !== 'ja') {
        server.use(
            expressSession({
                secret: 'dan borge',
                resave: false,
                saveUninitialized: false,
                unset: 'destroy',
                cookie: {
                    sameSite: 'lax',
                    secure: config.backend.prod,
                    httpOnly: true,
                    domain: config.backend.prod ? 'nav.no' : 'localhost',
                },
            }),
        )
    }

    server.use(helmet())
    server.use(
        cors({
            origin: '*',
            exposedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With'],
            credentials: true,
        }),
    )
    server.use(json())

    server.use(passport.initialize())
    server.use(passport.session())
    server.use(routes)
}
