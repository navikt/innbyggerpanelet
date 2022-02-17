import { StatusCodes } from 'http-status-codes';

export class BaseError extends Error {
    private _httpStatus: number = StatusCodes.INTERNAL_SERVER_ERROR;
}