import { NextFunction, Request, RequestHandler, Response } from 'express'
import * as jose from 'jose'
import { UnathorizedError } from '../../lib/errors/http/UnauthorizedError'
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages'
import config from '../../config'
import { CitizenService, EmployeeService } from '../../services'
import { database } from '../../loaders'
import { Employee } from '../../models/employee/EmployeeEntity'
import { EnumUserRole } from '../../types'
import { Citizen } from '../../models/citizen/CitizenEntity'
import { ForbiddenError } from '../../lib/errors/http/ForbiddenError'

// A little bit dirty, but it works
declare module 'express-serve-static-core' {
    export interface Request {
        user: {
            role: EnumUserRole
            id: string
        }
    }
}

// TODO: Add method that checks if authenticated

// TODO: Add this instead of auth check above
const addUserDetailsToRequest: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const bearerSchema = req.headers.authorization
    if (!bearerSchema) throw new UnathorizedError({ message: ServerErrorMessage.noBearerSchema() })

    const token = bearerSchema.split(' ')[1]
    if (!token) throw new UnathorizedError({ message: ServerErrorMessage.noTokenInSchema() })

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(
            token,
            jose.createRemoteJWKSet(new URL(process.env.AZURE_OPENID_CONFIG_JWKS_URI!)),
            {
                issuer: process.env.AZURE_OPENID_CONFIG_ISSUER,
                audience: process.env.AZURE_APP_CLIENT_ID,
            },
        )

        if (!payload || !protectedHeader) throw new Error('Not azure authenticated')

        // Create employee if not exists
        const employeeService = new EmployeeService(database)
        const employee: Employee = await employeeService
            .getById(payload.oid as string)
            .then((user) => {
                return user
            })
            .catch(async (error) => {
                // TODO: update azureAD group depending on dev/prod
                return await employeeService.create({
                    id: payload.oid as string,
                    firstname: (payload.name as string).split(',')[1],
                    surname: (payload.name as string).split(',')[0],
                    email: payload.preferred_username as string,
                    role: (payload.groups as Array<string>).includes('2d7f1c0d-5784-4f81-8bb2-8f3a79f8f949')
                        ? EnumUserRole.Admin
                        : EnumUserRole.InsightWorker,
                    registered: true,
                    insightProjects: [],
                    messages: [],
                })
            })

        // Add employee to req
        req.user.id = employee.id
        req.user.role = employee.role
    } catch (error) {
        // Not azure authenticated
        // TODO: throw errors given by employee service
        next(error)
    }

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(
            token,
            jose.createRemoteJWKSet(new URL(config.tokenX.jwksURI!)),
            {
                issuer: config.tokenX.issuer,
                audience: config.tokenX.clientId,
            },
        )

        if (!payload || !protectedHeader) throw new Error('Not idporten authenticated')

        // Create citizen if not exists
        const citizenService = new CitizenService(database)
        const citizen: Citizen = await citizenService
            .getById(payload.sub as string)
            .then((user) => {
                return user
            })
            .catch(async (error) => {
                return await citizenService.create({
                    id: payload.sub as string,
                    pnr: payload.pid as string,
                    firstname: '',
                    surname: '',
                    phone: '',
                    registered: false,
                    role: EnumUserRole.Citizen,
                    expirationDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                    candidates: [],
                    criterias: [],
                    messages: [],
                })
            })

        req.user.id = citizen.id
        req.user.role = citizen.role
    } catch (error) {
        // Not IDporten authenticated
        // TODO: throw errors given by citizen service
        next(error)
    }

    next()
}

const isCitizen: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.Citizen) {
        next()
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() })
    }
}

const isNAV: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.InsightWorker || req.user.role === EnumUserRole.Admin) {
        next()
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() })
    }
}

const isAdmin: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === EnumUserRole.Admin) {
        next()
    } else {
        throw new ForbiddenError({ message: ServerErrorMessage.forbidden() })
    }
}

export const authenticated = [addUserDetailsToRequest]
export const citizenAuthenticated = [addUserDetailsToRequest, isCitizen]
export const navAuthenticated = [addUserDetailsToRequest, isNAV]
export const adminAuthenticated = [addUserDetailsToRequest, isAdmin]
