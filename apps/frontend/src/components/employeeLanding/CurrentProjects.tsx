import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import CurrentProjectCard from './CurrentProjectCard';
import style from './CurrentProjects.module.scss';

export default function CurrentProjects({ 
    filteredProjects 
}: { 
    filteredProjects: {
        onGoingProjects: IInsightProject[],
        futureProjects: IInsightProject[],
        completedProjects: IInsightProject[]
    }
}): ReactElement {
    return (
        <div className={style.currentProjectsContainer}>
            <Heading size="xlarge">Mine prosjekter</Heading>
            <Heading size="large">Pågående</Heading>
            <div className={style.projectsContainer}>
                {filteredProjects.onGoingProjects.length !== 0 ? (
                    filteredProjects.onGoingProjects.map((item, i) => {
                        return <CurrentProjectCard insightProject={item} id={item.id} />;
                    })
                ) : (
                    <BodyShort>Du har ingen pågående prosjekter...</BodyShort>
                )}
            </div>
            <Heading size="large">Fremtidige</Heading>
            <div className={style.projectsContainer}>
                {filteredProjects.futureProjects.length !== 0 ? (
                    filteredProjects.futureProjects.map((item, i) => {
                        return <CurrentProjectCard insightProject={item} id={item.id} />;
                    })
                ) : (
                    <BodyShort>Du har ingen fremtidige prosjekter...</BodyShort>
                )}
            </div>
            <Heading size='large'>Gjennomførte</Heading>
            <div className={style.projectsContainer}>
                {filteredProjects.completedProjects.length !== 0 ? (
                    filteredProjects.completedProjects.map((item, i) => {
                        return <CurrentProjectCard insightProject={item} id={item.id} />;
                    })
                ) : (
                    <BodyShort>Du har ingen gjennomførte prosjekter...</BodyShort>
                )}
            </div>
        </div>
    );
}