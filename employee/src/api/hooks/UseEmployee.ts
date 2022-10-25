import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { EnumUserRole, IEmployee } from '../../types'
import { fetcher } from '../operations'

export const useTeamMemberByName = (name: string) => {
    const { data, error } = useSWR<IEmployee[], AxiosError>(
        `/innbyggerpanelet/ansatt/api/employee/teamMember?name=%${name}%`,
        fetcher,
    )

    return { employees: data, loading: !data && !error, error: error }
}

export const useEmployeesByNameAndRole = (firstname: string, surname: string, role: EnumUserRole) => {
    const { data, error } = useSWR<IEmployee[], AxiosError>(
        `/innbyggerpanelet/ansatt/api/employee?where[firstname]=%${firstname}%&where[surname]=%${surname}%&where[role]=${role}`,
        fetcher,
    )

    return { employees: data, loading: !data && !error, error: error }
}
