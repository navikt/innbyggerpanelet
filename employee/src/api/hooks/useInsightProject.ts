import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { IInsightProject, IUser } from '../../types'
import { fetcher } from '../operations'

export const useInsightProjects = () => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(`${config.basePath}/api/insightProject`, fetcher)

    return {
        insightProjects: data,
        loading: !error && !data,
        error: error,
    }
}

export const useInsightProjectMembers = (id: number | string) => {
    const { data, error } = useSWR<IUser[], AxiosError>(`${config.basePath}/api/insightProject/${id}/members`, fetcher)

    return { members: data, loading: !error && !data, error: error }
}

export const useInsightProjectById = (id: string | number) => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        `${config.basePath}/api/insightProject?relations=members&where[id]=${id}`,
        fetcher,
    )

    const reduced = !data ? undefined : data[0]

    return {
        insightProject: reduced,
        loading: !error && !data,
        error: error,
    }
}

export const useInsightProjectByCurrentUser = () => {
    const { data, error } = useSWR<IInsightProject[], AxiosError>(
        `${config.basePath}/api/insightProject/currentUser`,
        fetcher,
    )

    return {
        insightProjects: data,
        loading: !error && !data,
        error,
    }
}
