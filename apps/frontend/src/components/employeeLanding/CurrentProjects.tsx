import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './CurrentProjects.module.scss';

export default function CurrentProjects(): ReactElement {
    return (
        <div className={style.currentProjectsContainer}>
            <Heading size="xlarge">Mine prosjekter</Heading>
        </div>
    );
}