export default function isNorwegianPhoneNumber(phoneNumber: string): boolean {
    const phoneNumberRegex = /^(0047|\+47|47)?[2-9]\d{7}$/;

    return phoneNumberRegex.test(String(phoneNumber));
}