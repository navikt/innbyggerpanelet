import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import CurrentProjectCard from './CurrentProjectCard';
import style from './CurrentProjects.module.scss';

export default function CurrentProjects({ projects }: { projects: IInsightProject[]}): ReactElement {
    return (
        <div className={style.currentProjectsContainer}>
            <Heading size="xlarge">Mine prosjekter</Heading>
            <div className={style.projectsContainer}>
                {projects.map((item, i) => {
                    return <CurrentProjectCard key={i} insightProject={item} />;
                })}
            </div>
        </div>
    );
}