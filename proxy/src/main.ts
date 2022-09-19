import parser from 'body-parser'
import rTracer from 'cls-rtracer'
import express, { Request, Response } from 'express'
import path from 'path'
import session from './auth/session'
import config from './config'
import logger from './monitoring/logger'
import proxy from './proxy'
import dotenv from 'dotenv'
import expressStaticGzip from 'express-static-gzip'

dotenv.config()

const app = express()

const basePath = process.env.BASE_PATH!
const buildPath = path.join(path.resolve(__dirname, '../dist'))

app.use(
    rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x_correlation_id',
    }),
)

app.set('trust proxy', 1)
app.use(
    basePath,
    expressStaticGzip(`${buildPath}`, {
        enableBrotli: true,
        orderPreference: ['br'],
    }),
)
app.use(parser.json())

app.get(`${basePath}/isalive|${basePath}/isready`, (req: Request, res: Response) => {
    res.send('OK')
})

logger.info('Setting up session and proxy')

app.get(`${basePath}/session`, session())
app.use(`${basePath}/api`, proxy(process.env.API_URL!!))

app.listen(config.app.port, '127.0.0.1', () => {
    logger.info(`App listening at http://localhost:${config.app.port}`)
})
