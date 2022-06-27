import { IEmployee } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { putter } from '../operations';

export const updateEmployee = async (employee: IEmployee) => {
    const { data, error } = await putter<IEmployee>('/api/employee', employee);

    mutate('/api/employee/currentUser');

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};
