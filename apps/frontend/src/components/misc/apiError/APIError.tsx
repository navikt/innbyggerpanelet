import { Alert } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement } from 'react';

interface IProps {
    error: AxiosError;
}

export const APIError = ({ error }: IProps): ReactElement => {
    const { status, statusText } = error.request;

    return <Alert variant="error">{`${status}: ${statusText}`}</Alert>;
};
