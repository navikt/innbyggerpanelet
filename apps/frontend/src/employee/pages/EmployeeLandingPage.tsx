import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { useFilterInsightProjects } from '../../core/hooks/useEmployeeLanding';
import { EmployeeInfo } from '../components';
import { EmployeeCurrentProjects } from '../containers';
import style from './pages.module.scss';

export const EmployeeLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    return (
        <PanelNoBackground className={style.employeeLandingPageContainer}>
            <Link to="/profil">
                <EmployeeInfo name={user?.firstname + ' ' + user?.surname} />
            </Link>
            <div className={style.newProjectButtonContaner}></div>
            <EmployeeCurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }} />
        </PanelNoBackground>
    );
};
