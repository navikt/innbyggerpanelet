import { Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';

import style from './NotFound.module.scss';

export const NotFound = (): ReactElement => {
    return (
        <Panel className={style.wrapper}>
            <Heading size="large">404: Denne siden eksisterer ikke...</Heading>
        </Panel>
    );
};
