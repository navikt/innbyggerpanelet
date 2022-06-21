import { EnumEmployeeRole, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useTeamMemberByName = (name: string) => {
    const { data, error } = useSWR<IEmployee[], AxiosError>(`/api/employee/teamMember?name=%${name}%`, fetcher);

    return { employees: data, loading: !data && !error, error: error };
};

export const useEmployeesByNameAndRole = (firstname: string, surname: string, role: EnumEmployeeRole) => {
    const { data, error } = useSWR<IEmployee[], AxiosError>(
        `/api/employee?where[firstname]=%${firstname}%&where[surname]=%${surname}%&where[role]=${role}`,
        fetcher
    );

    return { employees: data, loading: !data && !error, error: error };
};
