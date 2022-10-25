import { AxiosResponse } from 'axios'
import { ValidationError } from 'class-validator'
import { IConsent } from '../../types'
import { poster } from '../operations'

export const createConsents = async (consents: IConsent[]) => {
    const { data, error } = await poster<IConsent[]>('/innbyggerpanelet/ansatt/api/consent', consents)

    if (error?.response?.status === 406) {
        return {
            response: data,
            validationErrors: JSON.parse((error.response as AxiosResponse).data.message) as ValidationError[],
        }
    }

    return {
        response: data,
        error: error,
    }
}
