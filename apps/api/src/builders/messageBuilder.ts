import { validateEmailMessage, validateEmailTitle, validateEpochTime, validateMessage, validateSafetyLevel, validateSmsMessage } from "./validation/validateMessage"

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
        "tekst": "${validateMessage(message.message)}", 
        "link": "", 
        "sikkerhetsnivaa": ${validateSafetyLevel(message.safetyLevel)},
        "eksternVarsling": ${message.externalWarning},
        "prefererteKanaler": ${[]},
        "epostVarslingstekst": ${validateEmailMessage(message.emailMessage, message.externalWarning)},
        "epostVarslingstittel": ${validateEmailTitle(message.emailTitle, message.externalWarning)},
        "smsVarslingstekst": ${validateSmsMessage(message.smsMessage, message.externalWarning)}
    }`;
};