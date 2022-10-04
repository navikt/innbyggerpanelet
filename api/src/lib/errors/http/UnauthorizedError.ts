import { StatusCodes } from 'http-status-codes'
import { BaseError } from '../BaseError'
import { ErrorCode } from '../ErrorCode'

export class UnathorizedError extends BaseError {
    constructor({ message, code }: { message: string; code?: ErrorCode }) {
        super({ message, httpStatus: StatusCodes.UNAUTHORIZED, code })
    }
}
