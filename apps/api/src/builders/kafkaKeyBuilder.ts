import { IsNotEmpty, Max, validate, Validate } from 'class-validator';
import { IsNorwegianBirthNumber } from './constraints/IsNorwegianBirthNumber';

interface IKeyInput {
    eventId: string;
    groupingId: string;
    birthNumber: string;
    namespace: string;
    appName: string;
}

/* eslint-disable indent */
class KafkaKey implements IKeyInput {
    eventId: string;

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
/* eslint-enable indent */

export const buildKeyInput = (keyInput: IKeyInput): string => {
    let kafkaKey = new KafkaKey();
    kafkaKey = keyInput;

    validate(kafkaKey);

    return `{
        "eventId": "${kafkaKey.eventId}", 
        "grupperingsId": "${kafkaKey.groupingId}", 
        "fodselsnummer": "${kafkaKey.birthNumber}", 
        "namespace": "${kafkaKey.namespace}", 
        "appnavn": "${kafkaKey.appName}"
    }`;
};
