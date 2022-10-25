import { Request, RequestHandler, Response } from 'express'
import TokenExchangeClient from './auth/tokenExchange'
import logger from './monitoring/logger'
import fetch from 'cross-fetch'
import * as jose from 'jose'
import config from './config'
import axios, { AxiosError } from 'axios'

const isEmpty = (obj: any) => !obj || !Object.keys(obj).length

const isOK = (status: number) => [200, 404, 409].includes(status)

const { exchangeIDPortenToken, exchangeAzureADToken } = new TokenExchangeClient()

const prepareSecuredRequest = async (req: Request) => {
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

    return {
        method: req.method,
        body,
        headers,
    }
}

export default function proxy(host: string): RequestHandler {
    return async (req: Request, res: Response) => {
        //TODO: switch case for status codes, based on status code respond appropietly
        try {
            const request: any = await prepareSecuredRequest(req)

            let axiosRes = null

            switch (request.method) {
                case 'GET':
                    axiosRes = await axios.get(`${host}${req.path}`, { headers: request.headers }).then((res) => {
                        return res
                    })
                    break
                case 'POST':
                    axiosRes = await axios
                        .post(`${host}${req.path}`, request.body, { headers: request.headers })
                        .then((res) => {
                            return res
                        })
                    break
                case 'PUT':
                    axiosRes = await axios
                        .put(`${host}${req.path}`, request.body, { headers: request.headers })
                        .then((res) => {
                            return res
                        })
                    break
                case 'DELETE':
                    axiosRes = await axios.delete(`${host}${req.path}`, { headers: request.headers }).then((res) => {
                        return res
                    })
                    break
            }

            logger.info(`${axiosRes?.status} ${axiosRes?.statusText}: ${req.method} ${req.path}`)

            return res.status(axiosRes?.status!).json(axiosRes?.data)
        } catch (error) {
            if (error instanceof AxiosError) {
                logger.error(`Call failed (${req.method} - ${req.path}): `, error.message)
            } else {
                logger.error(`Call failed (${req.method} - ${req.path}): `, error)
            }

            return res.status(500).send('Error')
        }
    }
}
