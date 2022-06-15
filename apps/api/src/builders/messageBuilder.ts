import { 
    BESKJED_MAX_LENGTH, 
    EMAIL_MESSAGE_MAX_LENGTH, 
    EMAIL_TITLE_MAX_LENGTH, 
    SMS_MESSAGE_MAX_LENGTH, 
    validateEpochTime, 
    validateExternalNotEmptyMaxLength, 
    validateNotEmptyMaxLength, 
    validateSafetyLevel 
} from "./util/kafkaMessageValidation"

interface IMessage {
    time: number // Epoch time
    visibleUntill: number // Epoch time
    externalWarning: boolean
    smsMessage: string
    message: string
    safetyLevel: number
    emailMessage: string | undefined
    emailTitle: string | undefined
}

export const buildMessage = (message: IMessage): string => {
    return `{
        "tidspunkt": ${validateEpochTime(message.time)}, 
        "synligFremTil": ${validateEpochTime(message.visibleUntill)}, 
        "tekst": "${validateNotEmptyMaxLength(message.message, 'message', BESKJED_MAX_LENGTH)}", 
        "link": "", 
        "sikkerhetsnivaa": ${validateSafetyLevel(message.safetyLevel)},
        "eksternVarsling": ${message.externalWarning},
        "prefererteKanaler": ${[]},
        "epostVarslingstekst": ${validateExternalNotEmptyMaxLength(message.emailMessage, 'email message', EMAIL_MESSAGE_MAX_LENGTH ,message.externalWarning)},
        "epostVarslingstittel": ${validateExternalNotEmptyMaxLength(message.emailTitle, 'email title', EMAIL_TITLE_MAX_LENGTH ,message.externalWarning)},
        "smsVarslingstekst": ${validateExternalNotEmptyMaxLength(message.smsMessage, 'sms message', SMS_MESSAGE_MAX_LENGTH, message.externalWarning)}
    }`;
};