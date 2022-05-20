import { IUser } from '@innbyggerpanelet/api-interfaces';
import validator from 'validator';
import { IErrorMessage } from '../IErrorMessage';
import { isFieldEmpty } from '../utils/isFieldEmpty';
import isNorwegianPhoneNumber from '../utils/isNorwegainPhoneNumber';

export function validateRegisterUser(user: IUser): { isValid: boolean; errorMessages: IErrorMessage } {
    let isValid = true;
    const errorMessages: IErrorMessage = {
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

    if (!isFieldEmpty(user.role).isEmpty) {
        errorMessages.roleErrorMsg = isFieldEmpty(user.role, 'rolle').errorMsg;
        isValid = false;
    }

    return { isValid, errorMessages };
}

function validateEmail(email: string): { isValid: boolean; errorMsg: string } {
    let isValid = true;
    let errorMsg = '';

    if (!validator.isEmail(email)) {
        errorMsg = 'Eposten er ikke på riktig format';
        isValid = false;
    }
    if (!isFieldEmpty(email).isEmpty) {
        errorMsg = isFieldEmpty(email, 'epost').errorMsg;
        isValid = false;
    }

    return { isValid, errorMsg };
}

function validatePhone(phone: string): { isValid: boolean; errorMsg: string } {
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
