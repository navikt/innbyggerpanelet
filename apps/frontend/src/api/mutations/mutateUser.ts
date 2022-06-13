import { IUser } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { poster, putter } from '../operations';

export const createUser = async (user: IUser) => {
    const { data, error } = await poster<IUser>('/api/user', user);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};

export const updateUser = async (user: IUser) => {
    const { data, error } = await putter<IUser>('/api/user', user);

    mutate('/api/user/currentUser');

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
