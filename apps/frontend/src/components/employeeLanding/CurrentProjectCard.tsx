import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Detail, Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './CurrentProjectCard.module.scss';

export default function CurrentProjectCard({ insightProject }: { insightProject: IInsightProject}): ReactElement {
    return (
        <div className={style.cardContainer}>
            <Heading size='medium'>
                {insightProject.name}
            </Heading>
            <p>{insightProject.description}</p>
            <Detail size='small'>{`${insightProject.start} - ${insightProject.end}`}</Detail>
        </div>
    );
}