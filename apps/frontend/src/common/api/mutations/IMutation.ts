import { AxiosError } from 'axios';

export interface IMutation<T> {
    response: T | undefined,
    isLoading: boolean,
    isError: AxiosError | undefined
}