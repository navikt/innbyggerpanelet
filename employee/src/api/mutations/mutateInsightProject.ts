import { AxiosResponse } from 'axios'
import { ValidationError } from 'class-validator'
import config from '../../config'
import { IInsightProject } from '../../types'
import { poster } from '../operations'

export const createInsightProject = async (project: IInsightProject) => {
    const { data, error } = await poster<IInsightProject>(`${config.basePath}/api/insightProject`, project)

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
