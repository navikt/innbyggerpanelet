import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { ICriteria } from '../../types'
import { fetcher } from '../operations'

export const useCriteriaSearchByName = (name: string) => {
    const { data, error } = useSWR<ICriteria[], AxiosError>(
        `${config.basePath}/api/criteria?where[name]=%${name}%`,
        fetcher,
    )

    return { criterias: data, loading: !error && !data, error: error }
}
