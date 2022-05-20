import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { mutate } from 'swr';
import { poster } from '../operations';

export const createCriteria = async (criteria: ICriteria) => {
    const { data, error } = await poster<ICriteria>('/api/criteria', criteria);

    mutate(`/api/criteria?where[category]=${criteria.category.id}`);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};

export const updateCriteria = async (criteria: ICriteria) => {
    const { data, error } = await poster<ICriteria>('/api/criteria', criteria);

    return {
        response: data,
        error: error
    };
};
