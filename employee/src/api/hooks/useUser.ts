import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { fetcher } from '../operations'

// Gets currently authenticated user
export const useUser = <T>() => {
    const { data, error } = useSWR<T, AxiosError>('/api/candidate/', fetcher)

    return { user: data as T, loading: !data && !error, error }
}
