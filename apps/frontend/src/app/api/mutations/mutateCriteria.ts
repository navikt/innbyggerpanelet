import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { mutate } from 'swr';
import { poster } from '../operations';

export const createCriteria = async (criteria: ICriteria) => {
    const { data, error } = await poster<ICriteria>('/api/criteria', criteria);

    mutate(`/api/criteria?category=${criteria.category.id}`);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error,
    };
};
