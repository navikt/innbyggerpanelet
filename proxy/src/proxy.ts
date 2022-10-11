import { Request, RequestHandler, Response } from 'express'
import TokenXClient from './auth/tokenx'
import logger from './monitoring/logger'
import fetch from 'cross-fetch'
import * as jose from 'jose'
import config from './config'

const isEmpty = (obj: any) => !obj || !Object.keys(obj).length

const isOK = (status: number) => [200, 404, 409].includes(status)

const { exchangeToken } = new TokenXClient()

const prepareSecuredRequest = async (req: Request) => {
    const { authorization } = req.headers
    const token = authorization!!.split(' ')[1]

    const claims = jose.decodeJwt(token)
    console.log(claims)

    const accessToken = await exchangeToken(token).then((accessToken) => accessToken)

    const headers = {
        ...req.headers,
        authorization: `Bearer ${accessToken}`,
        x_correlation_id: logger.defaultMeta.x_correlation_id,
    }

    let body: any = undefined
    if (!isEmpty(req.body) && req.method === 'POST') {
        body = JSON.stringify(req.body)
    }

    return {
        method: req.method,
        body,
        headers,
    }
}

export default function proxy(host: string): RequestHandler {
    return async (req: Request, res: Response) => {
        try {
            const request: any = await prepareSecuredRequest(req)
            const response = await fetch(`${host}${req.path}`, request)

            if (isOK(response.status)) {
                logger.info(`${response.status} ${response.statusText}: ${req.method} ${req.path}`)
            } else {
                logger.error(`${response.status} ${response.statusText}: ${req.method} ${req.path}`)
            }

            return res.status(response.status).send(response.text())
        } catch (error) {
            logger.error(`Call failed (${req.method} - ${req.path}): `, error)

            return res.status(500).send('Error')
        }
    }
}
