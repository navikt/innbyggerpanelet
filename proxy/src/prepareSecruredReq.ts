import { NextFunction, Request, RequestHandler, Response } from 'express'
import TokenExchangeClient from './auth/tokenExchange'
import logger from './monitoring/logger'
import fetch from 'cross-fetch'
import * as jose from 'jose'
import config from './config'
import axios, { AxiosError } from 'axios'

const isEmpty = (obj: any) => !obj || !Object.keys(obj).length

const { exchangeIDPortenToken, exchangeAzureADToken } = new TokenExchangeClient()

export const prepareSecuredRequest: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers
    const token = authorization!!.split(' ')[1]

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

    req.body = body
    req.headers = headers
    next()
}
