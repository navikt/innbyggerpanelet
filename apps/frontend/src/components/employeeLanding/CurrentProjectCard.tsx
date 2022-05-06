import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Detail, Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './CurrentProjectCard.module.scss';
import { Link } from 'react-router-dom';

export default function CurrentProjectCard({ 
    insightProject,
    id
}: { 
    insightProject: IInsightProject
    id: number
}): ReactElement {
    return (
        <Link to={`/prosjekt/${id}`} className={style.cardContainer}>
            <Heading size='medium'>
                {insightProject.name}
            </Heading>
            <p>{insightProject.description}</p>
            <div className={style.dateDetail} >
                <Detail size='small'>{`${insightProject.start} - ${insightProject.end}`}</Detail>
            </div>
        </Link>
    );
}