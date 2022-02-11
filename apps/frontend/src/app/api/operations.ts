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

export const poster = async <T>(url: string, data: T) =>
    await axios
        .post(url, data)
        .then((res) => {
            return { data: res.data as T, error: undefined };
        })
        .catch((error: AxiosError) => {
            return { data: undefined, error };
            //throw error;
        });
