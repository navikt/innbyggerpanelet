import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useConsentSearchByDescription = (description: string) => {
    const { data, error } = useSWR<IConsent[], AxiosError>(`/api/consent?where[description]=%${description}%`, fetcher);

    return { consents: data, loading: !error && !data, error: error };
};
