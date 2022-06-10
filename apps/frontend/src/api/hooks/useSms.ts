import { ISms } from '@innbyggerpanelet/api-interfaces';
import { poster } from '../operations';

export const useSms = async (sms: ISms) => {
    const { data, error } = await poster<ISms>('/api/sms', sms);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};