import parser from 'body-parser'
import rTracer from 'cls-rtracer'
import express, { Request, Response } from 'express'
import path from 'path'
import session from './auth/session'
import config from './config'
import logger from './monitoring/logger'
import dotenv from 'dotenv'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { prepareSecuredRequest } from './prepareSecruredReq'

dotenv.config()

const app = express()

const basePath = process.env.BASE_PATH!
const buildPath = path.resolve(__dirname, '../dist')
const needAPI = process.env.NEEDS_API || 'no'

app.use(
    rTracer.expressMiddleware({
        useHeader: true,
        headerName: 'x_correlation_id',
    }),
)

app.set('trust proxy', 1)
app.use(basePath, express.static(buildPath, { index: false }))
app.use(parser.json())

app.get(`${basePath}/isalive|${basePath}/isready`, (req: Request, res: Response) => {
    res.send('OK')
})

if (needAPI == 'ja') {
    app.get(`${basePath}/session`, session())
    app.use(
        `${basePath}/api`,
        prepareSecuredRequest,
        createProxyMiddleware({
            target: config.app.apiUrl,
            changeOrigin: true,
            pathRewrite: { [`^${basePath}/api`]: '' },
        }),
    )
}

app.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => res.sendFile(`${buildPath}/index.html`))

app.listen(config.app.port, () => {
    logger.info(`App listening at http://localhost:${config.app.port}`)
})
