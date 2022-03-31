import { IErrorMessage } from '../IErrorMessage';

export interface IInsightErrors extends IErrorMessage {
    descriptionErrorMsg: string
    datesErrorMsg: string[]
    consentsErrorMsg: string
    candidatesErrorMsg: string
}