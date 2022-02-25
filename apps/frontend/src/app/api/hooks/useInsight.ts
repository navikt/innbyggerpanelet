import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useInsightsByProjectId = (id: number | string) => {
    const { data, error } = useSWR<IInsight[], AxiosError>(
        `/api/insight?where[project]=${id}&relations=criterias&relations=consents`,
        fetcher
    );

    return { insights: data, loading: !data && !error, error: error };
};
