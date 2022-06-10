import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { poster } from '../operations';

export const createInsightProject = async (project: IInsightProject) => {
    const { data, error } = await poster<IInsightProject>('/api/insightProject', project);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
