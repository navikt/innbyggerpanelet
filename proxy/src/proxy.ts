import { Request, RequestHandler, Response } from 'express'
import TokenXClient from './auth/tokenx'
import logger from './monitoring/logger'
import fetch from 'cross-fetch'
import { Issuer, Strategy, TokenSet } from 'openid-client'
import passport from 'passport'
import config from './config'

const isEmpty = (obj: any) => !obj || !Object.keys(obj).length

const isOK = (status: number) => [200, 404, 409].includes(status)

const { exchangeToken } = new TokenXClient()

const prepareSecuredRequest = async (req: Request) => {
    const { authorization } = req.headers
    const token = authorization!!.split(' ')[1]

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

    let employee: any = undefined
    if (config.authType == 'auzureAD') {
        employee = getAzureUser()
    }

    return {
        method: req.method,
        body,
        headers,
        employee,
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

async function getAzureUser() {
    let employee

    const azureADIssuer = await Issuer.discover(
        `https://login.microsoftonline.com/${config.azureAd.tenantId}/v2.0/.well-known/openid-configuration`,
    )

    const azureClient = new azureADIssuer.Client({
        client_id: config.azureAd.clientId!,
        client_secret: config.azureAd.secret,
        redirect_uris: [`${config.app.url}/oauth2/callback`],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post',
    })

    passport.use(
        'azureAD',
        new Strategy({ client: azureClient, usePKCE: 'S256' }, async (tokenSet: TokenSet, done: any) => {
            if (tokenSet.expired()) return done(null, false)

            const user = {
                tokenSets: {
                    self: tokenSet,
                },
                claims: tokenSet.claims(),
            }

            if (user.claims.aud !== config.azureAd.clientId) return done(null, false)

            employee = user

            return done(null, user)
        }),
    )

    return employee
}
