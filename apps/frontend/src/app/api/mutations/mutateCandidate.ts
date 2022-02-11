import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { poster } from '../operations';

export const createCandidates = async (candidates: ICandidate[]) => {
    const { data, error } = await poster<ICandidate[]>(
        '/api/candidate',
        candidates
    );

    return {
        response: data,
        isLoading: !error && !data,
        isError: error,
    };
};
