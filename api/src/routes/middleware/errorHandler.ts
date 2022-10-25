import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { QueryFailedError } from 'typeorm'
import config from '../../config'
import { BaseError } from '../../lib/errors/BaseError'
import { BadRequestError } from '../../lib/errors/http/BadRequestError'
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages'
import { InvalidTokenError } from 'jwt-decode'
import { UnathorizedError } from '../../lib/errors/http/UnauthorizedError'
import { IErrorResponse } from '../../lib/errors/IErrorResponse'

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    // if (error instanceof BaseError) {
    //     return response.status(error.httpStatus).json(error.toResponse())
    // }

    // if (error instanceof QueryFailedError) {
    //     const error = new BadRequestError({ message: ServerErrorMessage.invalidQuery() })
    //     return response.status(error.httpStatus).json(error.toResponse())
    // }

    // if (!config.backend.prod)
    //     return response
    //         .status(StatusCodes.INTERNAL_SERVER_ERROR)
    //         .json(`Something went wrong.. Try again later. \n${error}`)

    // return response.status(500).json('Something went wrong.. Try again later.')
    let errorStatus: number = StatusCodes.INTERNAL_SERVER_ERROR
    let errorMessage: IErrorResponse | string = config.backend.prod
        ? `Something went wrong.. Try again later. \n${error}`
        : 'Something went wrong.. Try again later.'

    if (error instanceof BaseError) {
        errorStatus = error.httpStatus
        errorMessage = error.toResponse()
    }

    if (error instanceof QueryFailedError) {
        const badRequestError = new BadRequestError({ message: ServerErrorMessage.invalidQuery() })
        errorStatus = badRequestError.httpStatus
        errorMessage = badRequestError.toResponse()
    }

    response.status(errorStatus).json(errorMessage)
}
