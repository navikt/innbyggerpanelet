import { IsNotEmpty, Max, Min, validate, Validate } from 'class-validator';
import { IsEpochTime } from './constraints/IsEpochTime';



interface ISmsMessage {
    time: number // Epoch time
    visibleUntill: number // Epoch time
    externalWarning: boolean
    smsMessage: string
    message: string
    safetyLevel: number
    emailMessage: string | undefined
    emailTitle: string | undefined
}

/* eslint-disable indent */
class SmsMessage implements ISmsMessage {
    @Validate(IsEpochTime)
    time: number;

    @Validate(IsEpochTime)
    visibleUntill: number;

    @IsNotEmpty()
    @Max(300)
    message: string;

    @Min(3)
    @Max(4)
    safetyLevel: number;

    externalWarning: boolean;

    @Max(4000)
    emailMessage: string;

    @Max(40)
    emailTitle: string;

    @Max(160)
    smsMessage: string;
} 
/* eslint-enable indent */

export const buildMessage = (message: ISmsMessage): string => {
    let smsMessage = new SmsMessage();
    smsMessage = message;

    validate(smsMessage);

    return `{
        "tidspunkt": ${smsMessage.time}, 
        "synligFremTil": ${smsMessage.visibleUntill}, 
        "tekst": "${smsMessage.message}", 
        "link": "", 
        "sikkerhetsnivaa": ${smsMessage.safetyLevel},
        "eksternVarsling": ${smsMessage.externalWarning},
        "prefererteKanaler": ${[]},
        "epostVarslingstekst": ${smsMessage.emailMessage},
        "epostVarslingstittel": ${smsMessage.emailTitle},
        "smsVarslingstekst": ${smsMessage.smsMessage}
    }`;
};