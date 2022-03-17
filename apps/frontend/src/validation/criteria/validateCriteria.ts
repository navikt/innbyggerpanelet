import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import { ICriteriaErrors } from './ICriteriaErrors';

export function validateCriteria(
    criteria: ICriteria
): {
    isValid: boolean,
    errorMessages: ICriteriaErrors
} {
    let isValid = true;
    const errorMessages: ICriteriaErrors = {
        nameErrorMsg: ''
    };

    if (!isFieldEmpty(criteria.name).isEmpty) {
        errorMessages.nameErrorMsg = isFieldEmpty(criteria.name, 'navn').errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages };
}