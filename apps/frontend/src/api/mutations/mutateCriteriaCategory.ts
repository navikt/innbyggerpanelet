import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { mutate } from 'swr';
import { poster } from '../operations';

export const createCriteriaCategory = async (category: ICriteriaCategory) => {
    const { data, error } = await poster<ICriteriaCategory>('/api/criteriaCategory', category);

    mutate('/api/criteriaCategory');

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};
