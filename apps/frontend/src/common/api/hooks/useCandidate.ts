import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCandidatesByUserId = (id: number | string) => {
    const { data, error } = useSWR<ICandidate[], AxiosError>(
        `/api/candidate?relations=user&relations=insight&where[user]=${id}`,
        fetcher
    );

    return { candidatures: data, loading: !data && !error, error: error };
};

export const useCandidatesByCurrentUser = () => {
    const { data, error } = useSWR<ICandidate[], AxiosError>('/api/candidate/currentUser', fetcher);

    return { candidates: data, loading: !data && !error, error: error };
};

export const useCandidatesByInsightId = (id: string | number) => {
    const { data, error } = useSWR<ICandidate[], AxiosError>(`/api/candidate/byInsightId/${id}`, fetcher);

    return { candidates: data, loading: !data && !error, error: error };
};

export const useCandidateByInsightId = (id: string | number | undefined) => {
    const { data, error } = useSWR<ICandidate, AxiosError>(`/api/candidate/currentUser/${id}`, fetcher);

    return { candidate: data, loading: !data && !error, error: error };
};
