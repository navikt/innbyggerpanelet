import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { isBefore, parse } from 'date-fns';
import { IInsightPojectErrors } from './IInsightProjectErrors';

export function isInsightProjectValid(
    insightProject: IInsightProject
): { 
    isValid: boolean, 
    errorMesseges: IInsightPojectErrors 
} {
    let isValid = true;
    const errorMesseges: IInsightPojectErrors = {
        nameErrorMsg: '',
        descriptionErrorMsg: '',
        datesErrorMsg: '',
        projectTeamErrorMsg: ''
    };

    if (!isFieldEmpty(insightProject.name).isEmpty) {
        errorMesseges.nameErrorMsg = isFieldEmpty(insightProject.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(insightProject.description).isEmpty) {
        errorMesseges.descriptionErrorMsg = isFieldEmpty(insightProject.description, 'beskrivelse').errorMsg;
        isValid = false;
    }
    if (!validateDates(insightProject.start, insightProject.end).isValid) {
        errorMesseges.datesErrorMsg = validateDates(insightProject.start, insightProject.end).errorMsg;
        isValid = false;
    }

    return { isValid, errorMesseges};
}

function isFieldEmpty(field: string, fieldName?: string): { isEmpty: boolean, errorMsg: string} {
    let isEmpty = true;
    let errorMsg = '';

    if (field !== '') {
        errorMsg = `Prosjektet må inneholde et/en ${fieldName}`;
        isEmpty = false;
    }

    return { isEmpty, errorMsg};
}

function validateDates(startDate: string, endDate: string): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (!isFieldEmpty(startDate).isEmpty) {
        errorMsg = isFieldEmpty(startDate).errorMsg + '\n';
        isValid = false;
    }
    if (!isFieldEmpty(endDate)) {
        errorMsg = errorMsg + isFieldEmpty(endDate).errorMsg + '\n';
        isValid = false;
    }
    if (isBefore(parse(endDate, 'DD.MM.YYYY', new Date()), parse(startDate, 'DD.MM.YYYY', new Date()))) {
        errorMsg = errorMsg + 'Sluttdato er før startdato';
        isValid = false;
    }

    return { isValid, errorMsg };
}