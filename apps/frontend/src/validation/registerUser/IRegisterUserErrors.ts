import { IErrorMessage } from '../IErrorMessage';

export interface IRegisterUserErrors extends IErrorMessage {
    emailErrorMsg: string
    phoneErrorMsg: string
}