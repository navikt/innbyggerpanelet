import { StatusCodes } from 'http-status-codes';
import { BaseError } from '../BaseError';
import { ErrorCode } from '../ErrorCode';

export class NotAcceptableError extends BaseError {
    constructor({ message, code }: {message: string; code?: ErrorCode}) {
        super({message: message, httpStatus: StatusCodes.NOT_ACCEPTABLE, code});
    }
}