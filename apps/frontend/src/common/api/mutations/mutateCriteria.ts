import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { poster, putter } from '../operations';

export const createCriteria = async (criteria: ICriteria) => {
    const { data, error } = await poster<ICriteria>('/api/criteria', criteria);

    mutate(`/api/criteria?where[category]=${criteria.category.id}`);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};

export const updateCriteria = async (criteria: ICriteria) => {
    const { data, error } = await putter<ICriteria>('/api/criteria', criteria);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
