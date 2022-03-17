import { ICandidate, IConsent, IInsight } from '@innbyggerpanelet/api-interfaces';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import { validateStartEndDates } from '../validateStartEndDates';
import { IInsightErrors } from './IInsightErrors';

export function validateInsight(
    insight: IInsight,
    candidates: ICandidate[]
): {
    isValid: boolean,
    errorMesseges: IInsightErrors
} {
    let isValid = true;
    const errorMesseges: IInsightErrors = {
        nameErrorMsg: '',
        descriptionErrorMsg: '',
        datesErrorMsg: [],
        consentsErrorMsg: '',
        candidatesErrorMsg: ''
    };

    if (!isFieldEmpty(insight.name).isEmpty) {
        errorMesseges.nameErrorMsg = isFieldEmpty(insight.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(insight.description).isEmpty) {
        errorMesseges.descriptionErrorMsg = isFieldEmpty(insight.description, 'beskrivelse').errorMsg;
        isValid = false;
    }
    if (!validateStartEndDates(insight.start, insight.end).isValid) {
        errorMesseges.datesErrorMsg = validateStartEndDates(insight.start, insight.end).errorMsgs;
        isValid = false;
    }
    if (!validateConsents(insight.consents).isValid) {
        errorMesseges.consentsErrorMsg = validateConsents(insight.consents).errorMsg;
        isValid = false;
    }
    if (!validateCandidates(candidates).isValid) {
        errorMesseges.candidatesErrorMsg = validateCandidates(candidates).errorMsg;
        isValid = false;
    }
    
    return { isValid, errorMesseges };
}

function validateConsents(consents: IConsent[]): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (consents.length === 0) {
        errorMsg = 'Du må legge til et samtykke';
        isValid = false;
    } 

    return { isValid, errorMsg };
}

function validateCandidates(candidates: ICandidate[]): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (candidates.length === 0) {
        errorMsg = 'Du må velge en kandidate til innsiktsarbeidet';
        isValid = false;
    }

    return { isValid, errorMsg };
}