import { StatusCodes } from 'http-status-codes'
import { BaseError } from '../BaseError'
import { ErrorCode } from '../ErrorCode'
import { ServerErrorMessage } from '../messages/ServerErrorMessages'

export class UnathorizedError extends BaseError {
    constructor(
        { message, code }: { message: string; code?: ErrorCode } = { message: ServerErrorMessage.unauthorized() },
    ) {
        super({ message, httpStatus: StatusCodes.UNAUTHORIZED, code })
    }
}
