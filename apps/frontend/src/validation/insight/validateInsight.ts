import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import { IInsightErrors } from './IInsightErrors';

export function validateInsight(
    insight: IInsight
): {
    isValid: boolean,
    errorMesseges: IInsightErrors
} {
    let isValid = true;
    const errorMesseges: IInsightErrors = {
        nameErrorMsg: '',
        descriptionErrorMsg: '',
        datesErrorMsg: [],
        criteriaErrorMsg: '',
        consentsErrorMsg: ''
    };

    if (!isFieldEmpty(insight.name).isEmpty) {
        errorMesseges.nameErrorMsg = isFieldEmpty(insight.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(insight.description).isEmpty) {
        errorMesseges.descriptionErrorMsg = isFieldEmpty(insight.description, 'beskrivelse').errorMsg;
        isValid = false;
    }

    return { isValid, errorMesseges };
}