import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../utils/fetcher';

export const useCriteriaCategory = () => {
    const { data, error } = useSWR<ICriteriaCategory[], AxiosError>(
        '/api/criteriaCategory',
        fetcher
    );
    /*
    const error = false;

    const data: CriteriaCategory[] = [
        {
            id: 1,
            name: 'Alder',
            description: 'Kandidatens aldergruppe.',
            criteria: [
                { id: 1, name: 'Mellom 18 og 25 år', exclusivitySlug: 'age' },
                { id: 2, name: 'Mellom 26 og 35 år', exclusivitySlug: 'age' },
            ],
        },
        {
            id: 2,
            name: 'Hjelpemidler',
            description:
                'Utvalg av mulige hjelpemidler tatt i bruk av kandidat.',
            criteria: [
                { id: 3, name: 'Skjermoppleser' },
                { id: 4, name: 'Rullestol' },
            ],
        },
    ];*/
    return { categories: data, isLoading: !error && !data, isError: error };
};

export const useCriteriaCategoryById = (id: number) => {
    const { data, error } = useSWR<ICriteriaCategory>(
        `/api/criteriaCategory/${id}`,
        fetcher
    );

    return { category: data, isLoading: !error && !data, isError: error };
};
