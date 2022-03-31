import { IErrorMessage } from '../IErrorMessage';

export interface IInsightPojectErrors extends IErrorMessage {
    descriptionErrorMsg: string
    datesErrorMsg: string[]
    projectTeamErrorMsg: string
}