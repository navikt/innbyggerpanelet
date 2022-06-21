import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { QueryFailedError } from 'typeorm';
import config from '../../config';
import { BaseError } from '../../lib/errors/BaseError';
import { BadRequestError } from '../../lib/errors/http/BadRequestError';
import { ServerErrorMessage } from '../../lib/errors/messages/ServerErrorMessages';

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    if (error instanceof BaseError) {
        return response.status(error.httpStatus).json(error.toResponse());
    }

    if (error instanceof QueryFailedError) {
        const error = new BadRequestError({ message: ServerErrorMessage.invalidQuery() });
        return response.status(error.httpStatus).json(error.toResponse());
    }

    if (!config.backend.prod)
        return response
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json('Something went wrong.. Try again later. \n ' + error);

    return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json('Something went wrong.. Try again later.');
}
