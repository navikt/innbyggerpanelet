import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { poster, putter } from '../operations';

export const createCitizen = async (citizen: ICitizen) => {
    const { data, error } = await poster<ICitizen>('/api/citizen', citizen);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    mutate('/api/auth/currentUser');

    return {
        response: data,
        error: error
    };
};

export const updateCitizen = async (citizen: ICitizen) => {
    const { data, error } = await putter<ICitizen>('/api/citizen', citizen);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    mutate('/api/auth/currentUser');

    return {
        response: data,
        error: error
    };
};
