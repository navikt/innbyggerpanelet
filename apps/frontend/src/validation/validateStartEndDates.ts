import { isBefore, parse } from 'date-fns';
import { isFieldEmpty } from './utils/isFieldEmpty';

export function validateStartEndDates(startDate: string, endDate: string): { isValid: boolean, errorMsgs: string[]} {
    let isValid = true;
    const errorMsgs: string[] = [];

    if (!isFieldEmpty(startDate).isEmpty) {
        errorMsgs.push(isFieldEmpty(startDate, 'startdato').errorMsg);
        isValid = false;
    }
    if (!isFieldEmpty(endDate).isEmpty) {
        errorMsgs.push(isFieldEmpty(endDate, 'sluttdato').errorMsg);
        isValid = false;
    }
    if (isBefore(parse(endDate, 'yyyy-MM-dd', new Date()), parse(startDate, 'yyyy-MM-dd', new Date()))) {
        errorMsgs.push('Sluttdato er før startdato');
        isValid = false;
    }

    return { isValid, errorMsgs };
}