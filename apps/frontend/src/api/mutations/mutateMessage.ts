import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { putter } from '../operations';

export const readMessage = async (message: IMessage) => {
    const { data, error } = await putter<IMessage>('/api/message/read', message);

    mutate('/api/message');

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
