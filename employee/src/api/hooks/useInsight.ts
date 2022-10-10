import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { IInsight } from '../../types'
import { fetcher } from '../operations'

export const useInsightsByProjectId = (id: number | string) => {
    const { data, error } = useSWR<IInsight[], AxiosError>(`${config.basePath}/api/insight/project/${id}`, fetcher)

    return { insights: data, loading: !data && !error, error: error }
}
