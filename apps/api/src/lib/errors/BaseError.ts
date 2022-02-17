import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from './ErrorCode';
import { IErrorResponse } from './IErrorResponse';
import { ServerErrorMessage } from './messages/ServerErrorMessages';

export class BaseError extends Error {
    private _httpStatus: number = StatusCodes.INTERNAL_SERVER_ERROR;
    private _code: ErrorCode = 'UNEXPECTED';

    constructor({
        message,
        httpStatus,
        code
    }: {
        message?: string;
        httpStatus?: StatusCodes;
        code?: ErrorCode
    } = {}) {
        super(message ? message : ServerErrorMessage.unexpected());

        if (httpStatus) {
            this._httpStatus = httpStatus;
        }
        if (code) {
            this._code = code;
        }
    }

    get httpStatus(): number {
        return this._httpStatus;
    }

    toResponse(): IErrorResponse {
        return {
            message: this.message,
            status: this.getStatusCodeName(),
            statusCode: this._httpStatus,
            code: this._code
        };
    }

    private getStatusCodeName(): string {
        return StatusCodes[this._httpStatus];
    }
}