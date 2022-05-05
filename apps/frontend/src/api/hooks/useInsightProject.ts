import { IInsight, IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
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

export const useInsightProjectByCurrentUser = (userId: string | number | undefined) => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        `/api/insightProject/currentUser/${userId}`, fetcher
    );

    return {
        insightProjects: data,
        loading: !error && !data,
        error
    };
};

/*
* TODO: MOVE THIS FROM INSIGHT PROJECT TO INSIGHT
*/
export const useInsightByInsightProject = (projectId: number) => {
    const { data, error } = useSWR<IInsight[], AxiosError>(`api/insightProject/insights/${projectId}`, fetcher);

    return {
        insights: data,
        loading: !error && !data,
        error
    };
};
