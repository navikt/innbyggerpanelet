import { ICitizen, ICriteria } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCitizenByCriterias = (criterias: ICriteria[], insightEndDate: string) => {
    const criteriasQueryString = criterias.map((c) => `criterias[]=${c.id}`).join('&');
    const insightEndDateQueryString = `&insightEndDate=${insightEndDate}`;

    const { data, error } = useSWR<ICitizen[], AxiosError>(
        `/api/citizen/prioritized?${criteriasQueryString + insightEndDateQueryString}`,
        fetcher
    );

    return { citizens: data, loading: !data && !error, error: error };
};

export const useFullCitizen = () => {
    const { data, error } = useSWR<ICitizen, AxiosError>('/api/citizen/full', fetcher);

    return { fullCitizen: data, loading: !data && !error, error };
};
