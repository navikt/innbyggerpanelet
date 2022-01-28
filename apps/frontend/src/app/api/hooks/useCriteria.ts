import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCriteriaByCategoryId = (categoryId: number) => {
    const { data, error } = useSWR<ICriteria[], AxiosError>(
        `/api/criteria/byCategory/${categoryId}`,
        fetcher
    );

    return { criterias: data, isLoading: !error && !data, isError: error };
};

export const useCriteriaById = (id: number) => {
    const { data, error } = useSWR<ICriteria, AxiosError>(
        `/api/criteria/${id}`,
        fetcher
    );

    return { criteria: data, isLoading: !error && !data, isError: error };
};
