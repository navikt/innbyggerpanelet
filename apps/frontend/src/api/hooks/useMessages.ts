import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { AxiosError } from 'axios';
import useSWR from 'swr';
import { fetcher } from '../operations';

export const useMessages = () => {
    const { data, error } = useSWR<IMessage[], AxiosError>('/api/message', fetcher);

    return { messages: data, loading: !data && !error, error: error };
};
