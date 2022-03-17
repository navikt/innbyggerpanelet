import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import { ICriteriaCategoryErrors } from './ICrtieriaCategoryErrors';

export function validateCriteriaCategory(
    criteriaCategory: ICriteriaCategory
): {
    isValid: boolean,
    errorMessages: ICriteriaCategoryErrors
} {
    let isValid = true;
    const errorMessages: ICriteriaCategoryErrors = {
        nameErrorMsg: '',
        descriptionErrorMsg: ''
    };

    if (!isFieldEmpty(criteriaCategory.name).isEmpty) {
        errorMessages.descriptionErrorMsg = isFieldEmpty(criteriaCategory.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(criteriaCategory.description).isEmpty) {
        errorMessages.descriptionErrorMsg = isFieldEmpty(criteriaCategory.description, 'beskrivelse').errorMsg;
    }

    return { isValid, errorMessages };
}