import { NextFunction, Request, Response } from 'express'
import jwksClient from 'jwks-rsa'
import jwt from 'jsonwebtoken'

const client = jwksClient({
    jwksUri: process.env.TOKEN_X_WELL_KNOWN_URL!,
})

function getKey(header: any, callback: any) {
    client.getSigningKey(header.kid, function (err, key: any) {
        const signInKey = key.pulicKey || key.rsaPublicKey
        callback(null, signInKey)
    })
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        jwt.verify(req.headers.authorization!, getKey, function (err, decoded) {
            console.log(decoded)
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
    next()
}
