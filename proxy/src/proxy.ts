import { Request, RequestHandler, Response } from 'express'
import TokenExchangeClient from './auth/tokenExchange'
import logger from './monitoring/logger'
import fetch from 'cross-fetch'
import * as jose from 'jose'
import config from './config'

const isEmpty = (obj: any) => !obj || !Object.keys(obj).length

const isOK = (status: number) => [200, 404, 409].includes(status)

const { exchangeIDPortenToken, exchangeAzureADToken } = new TokenExchangeClient()

const prepareSecuredRequest = async (req: Request) => {
    const { authorization } = req.headers
    const token = authorization!!.split(' ')[1]

    //const claims = jose.decodeJwt(token)
    //console.log(claims)

    const accessToken =
        config.authType === 'azureAD'
            ? await exchangeAzureADToken(token).then((accessToken) => accessToken.access_token)
            : (await exchangeIDPortenToken(token).then((accessToken) => accessToken)) || ''

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

            await fetch(`${host}${req.path}`, request)
                .then((res) => {
                    res.json()
                })
                .then((data) => {
                    console.log(data)
                })

            // if (isOK(response.status)) {
            //     logger.info(`${response.status} ${response.statusText}: ${req.method} ${req.path}`)
            // } else {
            //     logger.error(`${response.status} ${response.statusText}: ${req.method} ${req.path}`)
            // }

            return res.status(200)
        } catch (error) {
            logger.error(`Call failed (${req.method} - ${req.path}): `, error)

            return res.status(500).send('Error')
        }
    }
}
