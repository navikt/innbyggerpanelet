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
        "tidspunkt": ${message.time}, 
        "synligFremTil": ${message.visibleUntill}, 
        "tekst": "${message.message}", 
        "link": "", 
        "sikkerhetsnivaa": ${message.safetyLevel},
        "eksternVarsling": ${message.externalWarning},
        "prefererteKanaler": ${[]},
        "epostVarslingstekst": ${message.emailMessage},
        "epostVarslingstittel": ${message.emailTitle},
        "smsVarslingstekst": ${message.smsMessage}
    }`;
};