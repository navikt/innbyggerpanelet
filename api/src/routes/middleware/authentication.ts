import { NextFunction, Request, Response } from 'express'
import * as jose from 'jose'
import { UnathorizedError } from '../../lib/errors/http/UnauthorizedError'
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages'
import config from '../../config'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerSchema = req.headers.authorization
        if (!bearerSchema) throw new UnathorizedError({ message: ServerErrorMessage.noBearerSchema() })

        const token = bearerSchema.split(' ')[1]
        if (!token) throw new UnathorizedError({ message: ServerErrorMessage.noTokenInSchema() })

        const JWKS = jose.createRemoteJWKSet(new URL(config.tokenX.jwksURI!))

        const { payload, protectedHeader } = await jose.jwtVerify(token, JWKS, {
            issuer: config.tokenX.issuer,
            audience: `${config.nais.cluster}:${config.nais.namespace}:${config.nais.appName}`,
        })

        if (!payload || !protectedHeader) throw new UnathorizedError({ message: ServerErrorMessage.unauthorized() })
    } catch (err) {
        next(err)
    }
    next()
}
