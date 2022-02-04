import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCandidatesByInsightId = (id: number | string) => {
    const { data, error } = useSWR<ICandidate[], AxiosError>(
        `/api/candidate?relations=user&relations=insight&where[insight]=${id}`,
        fetcher
    );

    return { candidates: data, isLoading: !data && !error, isError: error };
};
