import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { poster } from '../operations';

export const createCandidates = async (candidates: ICandidate[]) => {
    const { data, error } = await poster<ICandidate[]>('/api/candidate', candidates);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
