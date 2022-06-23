import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { poster } from '../operations';

export const createInsight = async (insight: IInsight) => {
    const { data, error } = await poster<IInsight>('/api/insight', insight);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
