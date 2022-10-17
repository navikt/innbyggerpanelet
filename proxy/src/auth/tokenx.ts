import jwt from 'jsonwebtoken'
import { JWK } from 'node-jose'
import { Issuer, Strategy, TokenSet } from 'openid-client'
import { v4 as uuid } from 'uuid'
import config from '../config'
import logger from '../monitoring/logger'

const tokenXConfig = config.tokenX

export default class TokenXClient {
    private tokenXClient: any = null
    private audience: any = null

    constructor() {
        logger.info('Setting up TokenX')

        this.init()
            .then((client) => {
                this.tokenXClient = client
            })
            .catch(() => process.exit(1))
    }

    exchangeToken = async (accessToken: any) => {
        const clientAssertion = await this.createClientAssertion()
        console.log('Got here yes!')
        return this.tokenXClient
            .grant({
                grant_type: 'urn:ietf:params:oauth:grant-type:token-exchange',
                client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
                token_endpoint_auth_method: 'private_key_jwt',
                client_assertion: clientAssertion,
                subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
                subject_token: accessToken,
                audience: config.app.targetAudience,
            })
            .then((tokenSet: any) => {
                return Promise.resolve(tokenSet.access_token)
            })
            .catch((error: any) => {
                console.log(`Very nasty error: ${error}`)
                logger.error('Error in exchange of token: ', error)
                return Promise.reject(error)
            })
    }

    private createClientAssertion = async () => {
        const now = Math.floor(Date.now() / 1000)
        // TODO: add if citizen, employee or admin
        let payload = {
            sub: tokenXConfig.clientID,
            iss: tokenXConfig.clientID,
            aud: this.audience,
            jti: uuid(),
            nbf: now,
            iat: now,
            exp: now + 60,
        }

        const key = await this.asKey(tokenXConfig.privateJwk)

        const options: any = {
            algorithm: 'RS256',
            header: {
                kid: key.kid,
                typ: 'JWT',
                alg: 'RS256',
            },
        }

        return jwt.sign(payload, key.toPEM(true), options)
    }

    private asKey = async (jwk: any) => {
        if (!jwk) throw Error('JWK missing')

        return JWK.asKey(jwk).then((key) => {
            return Promise.resolve(key)
        })
    }

    private init = async () => {
        const tokenX = await Issuer.discover(tokenXConfig.discoveryUrl!)
        this.audience = tokenX.token_endpoint

        logger.info(`Discovered TokenX @ ${tokenX.issuer}`)

        try {
            const client = new tokenX.Client({
                client_id: tokenXConfig.clientID!,
                redirect_uris: [`http://localhost:${config.app.port}/oauth2/callback`],
                token_endpoint_auth_method: 'none',
            })

            logger.info('Created TokenX client')

            return Promise.resolve(client)
        } catch (error) {
            logger.error('Error in parsing of jwt or creation of TokenX client: ', error)
            return Promise.reject(error)
        }
    }
}
