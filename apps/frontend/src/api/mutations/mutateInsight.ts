import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { poster } from '../operations';

export const createInsight = async (insight: IInsight) => {
    const { data, error } = await poster<IInsight>('/api/insight', insight);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error,
    };
};
