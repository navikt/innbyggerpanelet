import { ICandidate } from '../../types'
import { poster } from '../operations'
import { ValidationError } from 'class-validator'
import { AxiosResponse } from 'axios'
import config from '../../config'

export const createCandidates = async (candidates: ICandidate[]) => {
    const { data, error } = await poster<ICandidate[]>(`${config.basePath}/api/candidate`, candidates)

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
