import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { IInsightPojectErrors } from './IInsightProjectErrors';

export function isInsightProjectValid(
    insightProject: IInsightProject
): { 
    isValid: boolean, 
    errorMesseges: IInsightPojectErrors 
} {
    const isValid = false;
    const errorMesseges: IInsightPojectErrors = {
        nameErrorMsg: 'Feil i navn av prosjektet',
        descriptionErrorMsg: 'Feil i beskrivelse av prosjektet',
        startsErrorMsg: 'Feil i start av prosjektet',
        endsErrorMsg: 'Feil i slutt av prosjektet',
        projectTeamErrorMsg: 'Feil i prosjekt team av prosjektet'
    };

    // TODO: fint a better solution to this "if" hell
    if (validateField(insightProject.name).isValid) {
        errorMesseges.nameErrorMsg = '';
        if (validateField(insightProject.description).isValid) {
            errorMesseges.descriptionErrorMsg = '';
        }
    } else {
        errorMesseges.nameErrorMsg = validateField(insightProject.name).errorMsg;
        errorMesseges.descriptionErrorMsg = validateField(insightProject.description).errorMsg;
    }

    return { isValid, errorMesseges};
}

function validateField(field: string): { isValid: boolean, errorMsg: string} {
    let isValid = false;
    let errorMsg = 'Feil i navn';

    if (field !== '') {
        errorMsg = 'Prosjektet må ha et navn';
    } else {
        isValid = true;
        errorMsg = '';
    }

    return { isValid, errorMsg};
}

function validateDates(startDate: Date, endDate: Date) {
    console.log('jalla');
}