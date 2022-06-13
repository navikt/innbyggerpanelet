import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { poster } from '../operations';

export const createCriteriaCategory = async (category: ICriteriaCategory) => {
    const { data, error } = await poster<ICriteriaCategory>('/api/criteriaCategory', category);

    mutate('/api/criteriaCategory');

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
