export function isFieldEmpty(field: string, fieldName?: string): { isEmpty: boolean, errorMsg: string} {
    let isEmpty = true;
    let errorMsg = '';

    if (field === '') {
        errorMsg = `Feltet må inneholde et/en ${fieldName}`;
        isEmpty = false;
    }

    return { isEmpty, errorMsg};
}