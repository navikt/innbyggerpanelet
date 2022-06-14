const BESKJED_MAX_LENGTH: number = 300
const EMAIL_MESSAGE_MAX_LENGTH: number = 4000
const EMAIL_TITLE_MAX_LENGTH: number = 40
const SMS_MESSAGE_MAX_LENGTH: number = 160

export const validateEpochTime = (time: number) => {
    if (time < Date.now()) throw new Error('time set is before current time')
    return time
}

export const validateMessage = (message: string) => {
    if (message = '') throw new Error('message cannot be empty')
    if (message.length > BESKJED_MAX_LENGTH) throw new Error(`message cannot be longer than ${BESKJED_MAX_LENGTH} characters`)
    return message
}

export const validateSafetyLevel = (safetyLevel: number) => {
    if (safetyLevel !== 3 || 4) throw new Error('safety level have to be either 3 or 4')
    return safetyLevel
}

export const validateEmailMessage = (emailMessage: string | undefined, externalWarning: boolean) => {
    if (!externalWarning) throw new Error('external warning set to false, there should be no email message')
    if (emailMessage = '') throw new Error('email message cannot be empty')
    if (emailMessage.length > EMAIL_MESSAGE_MAX_LENGTH) throw new Error(`email message cannot be longer than ${EMAIL_MESSAGE_MAX_LENGTH} characters`)
    return emailMessage
}

export const validateEmailTitle = (emailTitle: string | undefined, externalWarning: boolean) => {
    if (!externalWarning) throw new Error('external warning set to false, there should be no email title')
    if (emailTitle = '') throw new Error('email title cannot be empty')
    if (emailTitle.length > EMAIL_TITLE_MAX_LENGTH) throw new Error(`email title cannot be longer than ${EMAIL_TITLE_MAX_LENGTH} characters`)
    return emailTitle
}

export const validateSmsMessage = (smsMessage: string, externalWarning: boolean) => {
    if (!externalWarning) throw new Error('external warning set to false, there should be no sms message')
    if (smsMessage = '') throw new Error('sms message cannot be emtpy')
    if (smsMessage.length > SMS_MESSAGE_MAX_LENGTH) throw new Error(`sms message cannot be longer than ${SMS_MESSAGE_MAX_LENGTH} characters`)
    return smsMessage
}
