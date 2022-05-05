import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import { isFuture, isWithinInterval, parse } from 'date-fns';
import React, { ReactElement } from 'react';
import CurrentProjectCard from './CurrentProjectCard';
import style from './CurrentProjects.module.scss';

export default function CurrentProjects({ projects }: { projects: IInsightProject[]}): ReactElement {

    const filterProjects = (projects: IInsightProject[]): { 
        onGoingProjects: IInsightProject[],
        futureProjects: IInsightProject[],
        completedProjects: IInsightProject[]
    } => {
        const onGoingProjects: IInsightProject[] = [];
        const futureProjects: IInsightProject[] = [];
        const completedProjects: IInsightProject[] = [];
        if (projects !== undefined) {
            for (const project of projects) {
                if (isWithinInterval(
                    new Date(),
                    {
                        start: parse(project.start, 'yyyy-MM-dd', new Date()),
                        end: parse(project.end, 'yyyy-MM-dd', new Date())
                    }
                )) {
                    onGoingProjects.push(project);
                } else if (isFuture(parse(project.start, 'yyyy-MM-dd', new Date()))) {
                    futureProjects.push(project);
                } else {
                    completedProjects.push(project);
                }
            }
        }

        return { onGoingProjects, futureProjects, completedProjects};
    };

    return (
        <div className={style.currentProjectsContainer}>
            <Heading size="xlarge">Mine prosjekter</Heading>
            <Heading size="large">Pågående</Heading>
            <div className={style.projectsContainer}>
                {filterProjects(projects).onGoingProjects.length !== 0 ? (
                    filterProjects(projects).onGoingProjects.map((item, i) => {
                        return (
                            <CurrentProjectCard key={i} insightProject={item} />
                        );
                    })
                ) : (
                    <p>Du har ingen pågående prosjekter...</p>
                )}
            </div>
            <Heading size="large">Fremtidige</Heading>
            <div className={style.projectsContainer}>
                {filterProjects(projects).futureProjects.length !== 0 ? (
                    filterProjects(projects).futureProjects.map((item, i) => {
                        return <CurrentProjectCard key={i} insightProject={item} />;
                    })
                ) : (
                    <p>Du har ingen fremtidige prosjekter...</p>
                )}
            </div>
            <Heading size='large'>Gjennomførte</Heading>
            <div className={style.projectsContainer}>
                {filterProjects(projects).completedProjects.length !== 0 ? (
                    filterProjects(projects).completedProjects.map((item, i) => {
                        return <CurrentProjectCard key={i} insightProject={item} />;
                    })
                ) : (
                    <p>Du har ingen gjennomførte prosjekter...</p>
                )}
            </div>
        </div>
    );
}