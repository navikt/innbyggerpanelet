import { IUser } from '@innbyggerpanelet/api-interfaces';
import { poster } from '../operations';

export const createUser = async (user: IUser) => {
    const { data, error } = await poster<IUser>('/api/user', user);

    return {
        response: data,
        isLoading: !error && !data,
        isError: error
    };
};
