import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { ValidationError } from 'class-validator';
import { mutate } from 'swr';
import { poster, putter } from '../operations';

export const createCandidates = async (candidates: ICandidate[]) => {
    const { data, error } = await poster<ICandidate[]>('/api/candidate', candidates);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    return {
        response: data,
        error: error
    };
};

export const acceptCandidature = async (candidate: ICandidate) => {
    const { data, error } = await putter<ICandidate>('/api/candidate/accept', candidate);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    mutate('/api/candidate/currentUser');
    mutate('/api/message');

    return {
        response: data,
        error: error
    };
};

export const declineCandidature = async (candidate: ICandidate) => {
    const { data, error } = await putter<ICandidate>('api/candidate/decline', candidate);

    if (error?.response?.status === 406) {
        return { response: data, validationErrors: JSON.parse(error.response.data.message) as ValidationError[] };
    }

    mutate('/api/candidate/currentUser');
    mutate('/api/message');

    return {
        response: data,
        error: error
    };
};
