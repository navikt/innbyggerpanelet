import { EnumUserRole, ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useUser = () => {
    // TODO auth, get actual user and not id = 1
    const { data, error } = useSWR<IUser, AxiosError>('/api/user/currentUser', fetcher);

    return { user: data, loading: !data && !error, error: error };
};

export const useUsersByNameAndRole = (name: string, role: EnumUserRole) => {
    const { data, error } = useSWR<IUser[], AxiosError>(`/api/user?where[name]=%${name}%&where[role]=${role}`, fetcher);

    return { users: data, loading: !data && !error, error: error };
};

export const useTeamMemberByName = (name: string) => {
    const { data, error } = useSWR<IUser[], AxiosError>(`/api/user/teamMember?name=${name}`, fetcher);

    return { users: data, loading: !data && !error, error: error };
};

export const useUserByCriterias = (criterias: ICriteria[]) => {
    const queryString = criterias.map((c) => `criterias[]=${c.id}`).join('&');

    const { data, error } = useSWR<IUser[], AxiosError>(`/api/user/prioritized?${queryString}`, fetcher);

    return { users: data, loading: !data && !error, error: error };
};
