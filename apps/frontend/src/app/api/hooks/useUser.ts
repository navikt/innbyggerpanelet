import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useUserByName = (name: string) => {
    const { data, error } = useSWR<IUser[], AxiosError>(
        `/api/user?where[name]=%${name}%`,
        fetcher
    );

    return { users: data, isLoading: !data && !error, isError: error };
};

export const useUserByCriterias = (criterias: ICriteria[]) => {
    const queryString = criterias.map((c) => `criterias[]=${c.id}`).join('&');

    const { data, error } = useSWR<IUser[], AxiosError>(
        `/api/user/prioritized?${queryString}`,
        fetcher
    );

    return { users: data, isLoading: !data && !error, isError: error };
};
