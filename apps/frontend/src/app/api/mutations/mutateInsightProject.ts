import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { poster } from '../operations';

export const createInsightProject = async (project: IInsightProject) => {
    const { data, error } = await poster<IInsightProject>(
        '/api/insightProject',
        project
    );

    return {
        response: data,
        isLoading: !error && !data,
        isError: error,
    };
};
