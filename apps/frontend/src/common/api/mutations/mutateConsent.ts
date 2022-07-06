import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { poster } from '../operations';

export const createConsents = async (consents: IConsent[]) => {
    const { data, error } = await poster<IConsent[]>('/api/consent', consents);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
