import { IUser } from '@innbyggerpanelet/api-interfaces';
import { mutate } from 'swr';
import { poster, putter } from '../operations';

export const createUser = async (user: IUser) => {
    const { data, error } = await poster<IUser>('/api/user', user);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};

export const updateUser = async (user: IUser) => {
    const { data, error } = await putter<IUser>('/api/user', user);

    mutate(`/api/user/${user.id}`);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};
