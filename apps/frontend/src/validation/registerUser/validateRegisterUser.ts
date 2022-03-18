import { IUser } from '@innbyggerpanelet/api-interfaces';
import isEmail from '../utils/isEmail';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import isNorwegianPhoneNumber from '../utils/isNorwegainPhoneNumber';
import { IRegisterUserErrors } from './IRegisterUserErrors';

export function validateRegisterUser(user: IUser): { isValid: boolean, errorMessages: IRegisterUserErrors} {
    let isValid = true;
    const errorMessages: IRegisterUserErrors = {
        nameErrorMsg: '',
        emailErrorMsg: '',
        phoneErrorMsg: ''
    };

    if (!isFieldEmpty(user.name).isEmpty) {
        errorMessages.nameErrorMsg = isFieldEmpty(user.name, 'navn').errorMsg;
        isValid = false;
    }
    if (!validateEmail(user.email).isValid) {
        errorMessages.emailErrorMsg = validateEmail(user.email).errorMsg;
        isValid = false;
    }
    if (!validatePhone(user.phone).isValid) {
        errorMessages.phoneErrorMsg = validatePhone(user.phone).errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages};
}

function validateEmail(email: string): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (!isEmail(email)) {
        errorMsg = 'Eposten er ikke på riktig format';
        isValid = false;
    }
    if (!isFieldEmpty(email).isEmpty) {
        errorMsg = isFieldEmpty(email, 'epost').errorMsg;
        isValid = false;
    }

    return { isValid, errorMsg };
}

function validatePhone(phone: string): { isValid: boolean, errorMsg: string} {
    let isValid = true;
    let errorMsg = '';

    if (!isNorwegianPhoneNumber(phone)) {
        errorMsg = 'Telefonnummeret er ikke på riktig format';
        isValid = false;
    }
    if (!isFieldEmpty(phone).isEmpty) {
        errorMsg = isFieldEmpty(phone, 'telefonnummer').errorMsg;
        isValid = false;
    }

    return { isValid, errorMsg };
}