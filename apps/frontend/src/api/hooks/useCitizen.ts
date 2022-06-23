import { ICitizen, ICriteria } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useCitizenByCriterias = (criterias: ICriteria[]) => {
    const queryString = criterias.map((c) => `criterias[]=${c.id}`).join('&');

    const { data, error } = useSWR<ICitizen[], AxiosError>(`/api/citizen/prioritized?${queryString}`, fetcher);

    return { citizens: data, loading: !data && !error, error: error };
};
