import { v4 as uuidv4 } from 'uuid';

interface IKeyInput {
    eventId: uuidv4
    groupingId: string
    birthNumber: string
    namespace: string
    appName: string
}

export const buildKeyInput = (keyInput: IKeyInput): string => {
    return `{"eventId": "${keyInput.eventId}", "grupperingsId": "${keyInput.groupingId}", "fodselsnummer": "${keyInput.birthNumber}", "namespace": "${keyInput.namespace}", "appnavn": "${keyInput.appName}"}`; 
};