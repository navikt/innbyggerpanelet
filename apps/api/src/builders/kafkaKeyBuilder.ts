import { IsNotEmpty, Max, Validate } from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { IsNorwegianBirthNumber } from './util/IsNorwegianBirthNumber';
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
/* eslint-disable indent */
class KafkaKey implements IKeyInput {
    eventId: uuidv4;

    @IsNotEmpty()
    @Max(100)
    groupingId: string;

    @Validate(IsNorwegianBirthNumber)
    birthNumber: string;

    @IsNotEmpty()
    @Max(100)
    namespace: string;

    @IsNotEmpty()
    @Max(100)
    appName: string;
}