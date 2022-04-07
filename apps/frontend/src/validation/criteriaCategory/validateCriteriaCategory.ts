import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { IErrorMessage } from '../IErrorMessage';
import { isFieldEmpty } from '../utils/isFieldEmpty';

export function validateCriteriaCategory(
    criteriaCategory: ICriteriaCategory
): {
    isValid: boolean,
    errorMessages: IErrorMessage
} {
    let isValid = true;
    const errorMessages: IErrorMessage = {
        nameErrorMsg: '',
        descriptionErrorMsg: ''
    };

    if (!isFieldEmpty(criteriaCategory.name).isEmpty) {
        errorMessages.nameErrorMsg = isFieldEmpty(criteriaCategory.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(criteriaCategory.description).isEmpty) {
        errorMessages.descriptionErrorMsg = isFieldEmpty(criteriaCategory.description, 'beskrivelse').errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages };
}