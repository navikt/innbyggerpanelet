import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useInsightProjects = () => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        '/api/insightProject',
        fetcher
    );

    return {
        insightProjects: data,
        isLoading: !error && !data,
        isError: error,
    };
};

export const useInsightProjectMembers = (id: number | string) => {
    const { data, error } = useSWR<IUser[], AxiosError>(
        `/api/insightProject/${id}/members`,
        fetcher
    );

    return { members: data, isLoading: !error && !data, isError: error };
};

export const useInsightProjectById = (id: string | number) => {
    const { data, error } = useSWR<IInsightProject, AxiosError>(
        `/api/insightProject/${id}`,
        fetcher
    );

    return { insightProject: data, isLoading: !error && !data, isError: error };
};
