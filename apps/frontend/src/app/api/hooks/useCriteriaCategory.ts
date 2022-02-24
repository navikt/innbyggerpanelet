import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCriteriaCategory = () => {
    const { data, error } = useSWR<ICriteriaCategory[], AxiosError>('/api/criteriaCategory', fetcher);

    return { categories: data, loading: !error && !data, error: error };
};

export const useCriteriaCategoryById = (id: number) => {
    const { data, error } = useSWR<ICriteriaCategory>(`/api/criteriaCategory/${id}`, fetcher);

    return { category: data, loading: !error && !data, error: error };
};
