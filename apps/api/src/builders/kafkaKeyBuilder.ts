import { v4 as uuidv4 } from 'uuid';
import { 
    APP_NAME_MAX_LENGTH, 
    GROUPING_ID_MAX_LENGTH, 
    NAMESPACE_MAX_LENGTH, 
    validateBirthNumber, 
    validateNotEmptyMaxLength 
} from './util/kafkaMessageValidation';

interface IKeyInput {
    eventId: uuidv4
    groupingId: string
    birthNumber: string
    namespace: string
    appName: string
}

export const buildKeyInput = (keyInput: IKeyInput): string => {
    return `{
        "eventId": "${keyInput.eventId}", 
        "grupperingsId": "${validateNotEmptyMaxLength(keyInput.groupingId, 'groupingId', GROUPING_ID_MAX_LENGTH)}", 
        "fodselsnummer": "${validateBirthNumber(keyInput.birthNumber)}", 
        "namespace": "${validateNotEmptyMaxLength(keyInput.namespace, 'namespace', NAMESPACE_MAX_LENGTH)}", 
        "appnavn": "${validateNotEmptyMaxLength(keyInput.appName, 'app name', APP_NAME_MAX_LENGTH)}"
    }`; 
};