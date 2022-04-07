import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { IErrorMessage } from '../IErrorMessage';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import { validateStartEndDates } from '../validateStartEndDates';

export function validateInsightProject(
    insightProject: IInsightProject
): { 
    isValid: boolean, 
    errorMessages: IErrorMessage 
} {
    let isValid = true;
    const errorMessages: IErrorMessage = {
        nameErrorMsg: '',
        descriptionErrorMsg: '',
        datesErrorMsg: [],
        projectTeamErrorMsg: ''
    };

    if (!isFieldEmpty(insightProject.name).isEmpty) {
        errorMessages.nameErrorMsg = isFieldEmpty(insightProject.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!isFieldEmpty(insightProject.description).isEmpty) {
        errorMessages.descriptionErrorMsg = isFieldEmpty(insightProject.description, 'beskrivelse').errorMsg;
        isValid = false;
    }
    if (!validateStartEndDates(insightProject.start, insightProject.end).isValid) {
        errorMessages.datesErrorMsg = validateStartEndDates(insightProject.start, insightProject.end).errorMsgs;
        isValid = false;
    }
    if (!validateTeam(insightProject.members).isValid) {
        errorMessages.projectTeamErrorMsg = validateTeam(insightProject.members).errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages};
}

function validateTeam(team: IUser[]): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (team.length === 0) {
        errorMsg = 'Prosjektet må inneholdet et teammedlem';
        isValid = false;
    }

    return { isValid, errorMsg };
}

