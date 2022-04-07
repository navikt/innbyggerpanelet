import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { IErrorMessage } from '../IErrorMessage';
import { isFieldEmpty } from '../utils/isFieldEmpty';

export function validateCriteria(
    criteria: ICriteria
): {
    isValid: boolean,
    errorMessages: IErrorMessage
} {
    let isValid = true;
    const errorMessages: IErrorMessage = {
        nameErrorMsg: ''
    };

    if (!isFieldEmpty(criteria.name).isEmpty) {
        errorMessages.nameErrorMsg = isFieldEmpty(criteria.name, 'navn').errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages };
}