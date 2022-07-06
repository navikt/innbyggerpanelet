import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useConsentTemplateSearchByTitle = (title: string) => {
    const { data, error } = useSWR<IConsentTemplate[], AxiosError>(
        `/api/consentTemplate?where[title]=%${title}%`,
        fetcher
    );

    return { consentTemplates: data, loading: !error && !data, error };
};
