import { AxiosResponse } from 'axios'
import { ValidationError } from 'class-validator'
import config from '../../config'
import { IInsight } from '../../types'
import { poster } from '../operations'

export const createInsight = async (insight: IInsight) => {
    const { data, error } = await poster<IInsight>(`${config.basePath}/api/insight`, insight)

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
