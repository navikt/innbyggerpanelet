import { AxiosError } from 'axios'
import useSWR from 'swr'
import { ICandidate } from '../../types'
import { fetcher } from '../operations'

export const useCandidatesByInsightId = (id: string | number) => {
    const { data, error } = useSWR<ICandidate[], AxiosError>(
        `/innbyggerpanelet/ansatt/api/candidate/byInsightId/${id}`,
        fetcher,
    )

    return { candidates: data, loading: !data && !error, error: error }
}
