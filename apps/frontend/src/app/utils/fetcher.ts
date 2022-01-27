import axios, { AxiosError } from 'axios';

export const fetcher = async (url: string) =>
    await axios
        .get(url)
        .then((res) => {
            return res.data;
        })
        .catch((error: AxiosError) => {
            throw error;
        });
