import { ValidationError } from 'class-validator';
import { poster } from '../operations';
import { IConsentTemplate } from './../../../../../../libs/api-interfaces/src/lib/api-interfaces';

export const createConsentTemplate = async (consentTemplate: IConsentTemplate) => {
    const { data, error } = await poster<IConsentTemplate>('/api/consentTemplate', consentTemplate);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
