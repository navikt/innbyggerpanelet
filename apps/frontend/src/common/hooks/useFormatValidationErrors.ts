import { ValidationError } from 'class-validator';
import { useState } from 'react';

export interface IValidationError {
    [key: string]: string | string[];
}

export const useFormatValidationErrors = (): [IValidationError, (errors: ValidationError[]) => void] => {
    const [validationMessages, setValidationMessages] = useState<IValidationError>({});

    // Map ValidationError to format more easily consumed in components.
    const setErrors = (errors: ValidationError[]) => {
        const results: IValidationError = {};
        errors.map((error) => {
            if (error.constraints) results[error.property] = Object.values(error.constraints);
        });

        setValidationMessages(results);
    };

    return [validationMessages, setErrors];
};
