import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useInsightProjects = () => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>('/api/insightProject', fetcher);

    return {
        insightProjects: data,
        loading: !error && !data,
        error: error
    };
};

export const useInsightProjectMembers = (id: number | string) => {
    const { data, error } = useSWR<IUser[], AxiosError>(`/api/insightProject/${id}/members`, fetcher);

    return { members: data, loading: !error && !data, error: error };
};

export const useInsightProjectById = (id: string | number) => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        `/api/insightProject?relations=members&where[id]=${id}`,
        fetcher
    );

    const reduced = !data ? undefined : data[0];

    return {
        insightProject: reduced,
        loading: !error && !data,
        error: error
    };
};

export const useInsightProjectByUserId = (userId: string | number | undefined) => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        `/api/insightProject/${userId}`, fetcher
    );

    return {
        insightProjects: data,
        loading: !error && !data,
        error
    };
};
