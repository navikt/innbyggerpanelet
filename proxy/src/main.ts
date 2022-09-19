import parser from 'body-parser'
import rTracer from 'cls-rtracer'
import express, { Request, Response } from 'express'
import path from 'path'
import session from './auth/session'
import config from './config'
import logger from './monitoring/logger'
import proxy from './proxy'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const buildPath = path.resolve(__dirname, './dist')

app.use(
    rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x_correlation_id',
    }),
)

app.set('trust proxy', 1)
app.use(process.env.BASE_PATH!, express.static(buildPath, { index: false }))
app.use(parser.json())

app.get(`${process.env.BASE_PATH}/isalive|${process.env.BASE_PATH}/isready`, (req: Request, res: Response) => {
    res.sendStatus(200)
})

logger.info('Setting up session and proxy')

app.get(`${process.env.BASE_PATH}/session`, session())
app.use(`${process.env.BASE_PATH}/api`, proxy(process.env.API_URL!!))

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(buildPath + '/index.html'))

app.listen(config.app.port, () => {
    logger.info(`App listening at http://localhost:${config.app.port}`)
})
