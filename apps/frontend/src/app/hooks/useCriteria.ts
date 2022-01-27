import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export const useCriteria = () => {
    // Misses types
    const { data, error } = useSWR('/api/criteria', fetcher);

    return { criteria: data, isLoading: !error && !data, isError: error };
};

export const useCriteriaById = (id: number) => {
    // Misses types
    const { data, error } = useSWR(`/api/criteria/${id}`, fetcher);

    return { criteria: data, isLoading: !error && !data, isError: error };
};
