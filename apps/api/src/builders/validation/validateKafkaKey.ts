import { isValid } from "norwegian-birth-number-validator";

const GROUPING_ID_MAX_LENGTH: number = 100
const NAMESPACE_MAX_LENGTH: number = 100;
const APP_NAME_MAX_LENGTH: number = 100;

export const validateGroupingId = (groupingId: string) => {
    if (groupingId = '') throw new Error('groupingId cannot be empty')
    if (groupingId.length < GROUPING_ID_MAX_LENGTH) throw new Error(`groupingId cannot be longer than ${GROUPING_ID_MAX_LENGTH} characters`)
    return groupingId
}

export const validateBirthNumber = (birthNumber: string) => {
    if (!isValid(birthNumber)) throw new Error('birth number is not valid')
    return birthNumber
}

export const validateNamespace = (namespace: string) => {
    if (namespace = '') throw new Error('namespace cannot be empty')
    if (namespace.length > NAMESPACE_MAX_LENGTH) throw new Error(`namespace cannot be longer than ${NAMESPACE_MAX_LENGTH} characters`)
    return namespace
}

export const validateAppName = (appName: string) => {
    if (appName = '') throw new Error('app name cannot be empty')
    if (appName.length > APP_NAME_MAX_LENGTH) throw new Error(`app name cannot be longer than ${APP_NAME_MAX_LENGTH} characters`)
}