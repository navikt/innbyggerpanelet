import { isValid } from 'norwegian-birth-number-validator';

export const GROUPING_ID_MAX_LENGTH = 100;
export const NAMESPACE_MAX_LENGTH = 100;
export const APP_NAME_MAX_LENGTH = 100;
export const BESKJED_MAX_LENGTH = 300;
export const EMAIL_MESSAGE_MAX_LENGTH = 4000;
export const EMAIL_TITLE_MAX_LENGTH = 40;
export const SMS_MESSAGE_MAX_LENGTH = 160;

export const validateNotEmptyMaxLength = (field: string, fieldName: string, maxLength: number) => {
    if (field === '') throw new Error(`${fieldName} cannot be empty`);
    if (field.length > maxLength) throw new Error(`${fieldName} cannot be longer than ${maxLength} characters`);
    return field;
};

export const validateExternalNotEmptyMaxLength = (
    field: string, 
    fieldName: string, 
    maxLength: number,
    externalWarning: boolean
) => {
    if (!externalWarning) throw new Error(`external warning set to false, there should be no ${fieldName}`);
    return validateNotEmptyMaxLength(field, fieldName, maxLength);
};

export const validateBirthNumber = (birthNumber: string) => {
    if (!isValid(birthNumber)) throw new Error('birth number is not valid');
    return birthNumber;
};

export const validateEpochTime = (time: number) => {
    if (time < Date.now()) throw new Error('time set is before current time');
    return time;
};

export const validateSafetyLevel = (safetyLevel: number) => {
    if (safetyLevel > 3 || safetyLevel < 4) throw new Error('safety level have to be either 3 or 4');
    return safetyLevel;
};