import { AxiosError } from 'axios'
import useSWR from 'swr'
import config from '../../config'
import { IConsentTemplate } from '../../types'
import { fetcher } from '../operations'

export const useConsentTemplateSearchByTitle = (title: string) => {
    const { data, error } = useSWR<IConsentTemplate[], AxiosError>(
        `${config.basePath}/api/consentTemplate?where[title]=%${title}%`,
        fetcher,
    )

    return { consentTemplates: data, loading: !error && !data, error }
}
