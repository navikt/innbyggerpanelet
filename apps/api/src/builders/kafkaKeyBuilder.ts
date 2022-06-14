import { v4 as uuidv4 } from 'uuid';
import { validateAppName, validateBirthNumber, validateGroupingId, validateNamespace } from './validation/validateKafkaKey';

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
        "grupperingsId": "${validateGroupingId(keyInput.groupingId)}", 
        "fodselsnummer": "${validateBirthNumber(keyInput.birthNumber)}", 
        "namespace": "${validateNamespace(keyInput.namespace)}", 
        "appnavn": "${validateAppName(keyInput.appName)}"
    }`; 
};