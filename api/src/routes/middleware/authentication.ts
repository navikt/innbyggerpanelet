import { NextFunction, Request, Response } from 'express'
import jwt_decode, { InvalidTokenError } from 'jwt-decode'
import { UnathorizedError } from '../../lib/errors/http/UnauthorizedError'
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages'

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerSchema = req.headers.authorization
        if (!bearerSchema) throw new UnathorizedError({ message: ServerErrorMessage.noBearerSchema() })

        const token = bearerSchema.split(' ')[1]
        if (!token) throw new UnathorizedError({ message: ServerErrorMessage.noTokenInSchema() })

        const decodedToken: any = await jwt_decode(token)
        // 1. check if token is expired or not
        if (decodedToken.exp < Date.now() / 1000)
            throw new UnathorizedError({ message: ServerErrorMessage.expiredToken() })
        // 2. check if audience of token is this audience
        if (decodedToken.aud !== process.env.TOKEN_X_CLIENT_ID)
            throw new UnathorizedError({ message: ServerErrorMessage.wrongAudience() })
        // 3. check if issuer of token is either citizen or employee
        if (
            decodedToken.iss === 'dev-gcp:team-researchops:innbyggerpanelet-citizen' ||
            decodedToken.iss === 'dev-gcp:team-researchops:innbyggerpanelet-employee'
        )
            throw new UnathorizedError({ message: ServerErrorMessage.wrongIssuer() })
    } catch (err) {
        next(err)
    }
    next()
}
