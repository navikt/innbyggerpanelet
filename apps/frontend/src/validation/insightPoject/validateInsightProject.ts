import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { isBefore, parse } from 'date-fns';
import { IInsightPojectErrors } from './IInsightProjectErrors';

export function validateInsightProject(
    insightProject: IInsightProject
): { 
    isValid: boolean, 
    errorMesseges: IInsightPojectErrors 
} {
    let isValid = true;
    const errorMesseges: IInsightPojectErrors = {
        nameErrorMsg: '',
        descriptionErrorMsg: '',
        datesErrorMsg: [],
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
        errorMesseges.datesErrorMsg = validateDates(insightProject.start, insightProject.end).errorMsgs;
        isValid = false;
    }
    if (!validateTeam(insightProject.members).isValid) {
        errorMesseges.projectTeamErrorMsg = validateTeam(insightProject.members).errorMsg;
        isValid = false;
    }

    return { isValid, errorMesseges};
}

function isFieldEmpty(field: string, fieldName?: string): { isEmpty: boolean, errorMsg: string} {
    let isEmpty = true;
    let errorMsg = '';

    if (field === '') {
        errorMsg = `Prosjektet må inneholde et/en ${fieldName}`;
        isEmpty = false;
    }

    return { isEmpty, errorMsg};
}

function validateDates(startDate: string, endDate: string): { isValid: boolean, errorMsgs: string[]} {
    let isValid = true;
    const errorMsgs: string[] = [];

    if (!isFieldEmpty(startDate).isEmpty) {
        errorMsgs.push(isFieldEmpty(startDate, 'startdato').errorMsg);
        isValid = false;
    }
    if (!isFieldEmpty(endDate).isEmpty) {
        console.log('aoishf');
        errorMsgs.push(isFieldEmpty(endDate, 'sluttdato').errorMsg);
        isValid = false;
    }
    if (isBefore(parse(endDate, 'dd.MM.YYYY', new Date()), parse(startDate, 'dd.MM.YYYY', new Date()))) {
        errorMsgs.push('Sluttdato er før startdato');
        isValid = false;

    }

    return { isValid, errorMsgs };
}
function validateTeam(team: IUser[]): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (team.length === 0) {
        errorMsg = 'Prosjektet må inneholdet et team medlem';
        isValid = false;
    }

    return { isValid, errorMsg };
}