import cors from 'cors'
import { Application, json } from 'express'
import expressSession from 'express-session'
import helmet from 'helmet'
import passport from 'passport'
import config from '../config'
import routes from '../routes'
import { EnumUserRole } from '../types'

export default async ({ server }: { server: Application }) => {
    server.set('trust proxy', 1)

    server.use(helmet())
    server.use(
        cors({
            origin: '*',
            exposedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Requested-With'],
            credentials: true,
        }),
    )
    server.use(json())
    server.use(routes)
}
