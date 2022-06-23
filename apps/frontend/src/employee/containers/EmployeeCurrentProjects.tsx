import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import { EmployeeCurrentProjectCard } from '../components';
import style from './containers.module.scss';

export const EmployeeCurrentProjects = ({
    filteredProjects
}: {
    filteredProjects: {
        onGoingProjects: IInsightProject[];
        futureProjects: IInsightProject[];
        completedProjects: IInsightProject[];
    };
}): ReactElement => {
    const navigate = useNavigate();
    const { onGoingProjects, futureProjects, completedProjects } = filteredProjects;

    return (
        <div className={style.currentProjectsContainer}>
            <Heading size="xlarge">Mine prosjekter</Heading>
            <PanelNoBackground>
                <Heading size="large">Pågående</Heading>
                <Button onClick={() => navigate('prosjekt/ny')}>Nytt prosjekt</Button>
                <div className={style.projectsContainer}>
                    {onGoingProjects.length !== 0 ? (
                        onGoingProjects.map((item, i) => {
                            return <EmployeeCurrentProjectCard key={i} insightProject={item} id={item.id} />;
                        })
                    ) : (
                        <BodyShort>Du har ingen pågående prosjekter...</BodyShort>
                    )}
                </div>
                <Heading size="large">Fremtidige</Heading>
                <div className={style.projectsContainer}>
                    {futureProjects.length !== 0 ? (
                        futureProjects.map((item, i) => {
                            return <EmployeeCurrentProjectCard key={i} insightProject={item} id={item.id} />;
                        })
                    ) : (
                        <BodyShort>Du har ingen fremtidige prosjekter...</BodyShort>
                    )}
                </div>
                <Heading size="large">Gjennomførte</Heading>
                <div className={style.projectsContainer}>
                    {completedProjects.length !== 0 ? (
                        completedProjects.map((item, i) => {
                            return <EmployeeCurrentProjectCard key={i} insightProject={item} id={item.id} />;
                        })
                    ) : (
                        <BodyShort>Du har ingen gjennomførte prosjekter...</BodyShort>
                    )}
                </div>
            </PanelNoBackground>
        </div>
    );
};
