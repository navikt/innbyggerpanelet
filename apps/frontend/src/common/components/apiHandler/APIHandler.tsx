import { Heading, Loader, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement } from 'react';
import style from './APIHandler.module.scss';
interface IProps {
    loading: boolean;
    error: AxiosError | undefined;
}

export const APIHandler = ({ loading, error }: IProps): ReactElement => {
    let element = <></>;

    if (loading) element = <Loader />;

    if (error) {
        const errorStatus = error?.request.status;

        switch (errorStatus) {
            case 404:
                element = <Heading size="medium">Ingen resultater funnet.</Heading>;
                break;
            case 403:
                element = <Heading size="medium">Du har ikke tilgang til denne siden.</Heading>;
                break;
            case 400:
                element = <Heading size="medium">Sjekk at alle feltene er utfylt.</Heading>;
                break;
            default:
                element = <Heading size="medium">Det har skjedd en feil...</Heading>;
        }
    }

    return <Panel className={style.wrapper}>{element}</Panel>;
};
