import { ICriteriaErrors } from '../../validation/criteria';
import { ICriteriaCategoryErrors } from '../../validation/criteriaCategory';
import { IInsightErrors } from '../../validation/insight';
import { IInsightPojectErrors } from '../../validation/insightPoject';
import { IRegisterUserErrors } from '../../validation/registerUser';

export interface IErrorMessages<T> {
    nameErrorMessages: string
    otherErrorMessages: T | undefined
} 

export const errorMessageState: IErrorMessages<
    ICriteriaErrors | 
    ICriteriaCategoryErrors |
    IInsightErrors |
    IInsightPojectErrors |
    IRegisterUserErrors
> = {
    nameErrorMessages: '',
    otherErrorMessages: undefined
};
