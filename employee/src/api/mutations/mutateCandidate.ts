import { AxiosResponse } from 'axios'
import { ValidationError } from 'class-validator'
import { ICandidate } from '../../types'
import { poster } from '../operations'

export const createCandidates = async (candidates: ICandidate[]) => {
    const { data, error } = await poster<ICandidate[]>('/innbyggerpanelet/ansatt/api/candidate', candidates)

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
