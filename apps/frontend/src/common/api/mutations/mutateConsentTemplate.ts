import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { poster, putter } from '../operations';

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

export const updateConsentTemplate = async (consentTemplate: IConsentTemplate) => {
    const { data, error } = await putter<IConsentTemplate>('/api/consentTemplate', consentTemplate);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};

export const disableConsentTemplate = async (consentTemplate: IConsentTemplate) => {
    const { data, error } = await putter<IConsentTemplate>('/api/consentTemplate/disable', consentTemplate);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
