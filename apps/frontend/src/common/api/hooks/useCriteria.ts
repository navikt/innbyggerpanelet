import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCriteriaByCategoryId = (categoryId: number) => {
    const { data, error } = useSWR<ICriteria[], AxiosError>(`/api/criteria?where[category]=${categoryId}`, fetcher);

    return { criterias: data, loading: !error && !data, error: error };
};

export const useCriteriaSearchByName = (name: string) => {
    const { data, error } = useSWR<ICriteria[], AxiosError>(`/api/criteria?where[name]=%${name}%`, fetcher);

    return { criterias: data, loading: !error && !data, error: error };
};

export const useCriteriaById = (id: number) => {
    const { data, error } = useSWR<ICriteria, AxiosError>(`/api/criteria/${id}`, fetcher);

    return { criteria: data, loading: !error && !data, error: error };
};
