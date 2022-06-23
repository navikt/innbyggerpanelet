import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../common/api/hooks';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import { UserInfo } from '../../common/components/userInfo';
import { useFilterInsightProjects } from '../../common/hooks';
import { EmployeeCurrentProjects } from '../containers';
import style from './pages.module.scss';

export const EmployeeLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    return (
        <PanelNoBackground className={style.employeeLandingPageContainer}>
            <Link to="/profil">
                <UserInfo name={user?.firstname + ' ' + user?.surname} />
            </Link>
            <div className={style.newProjectButtonContaner}></div>
            <EmployeeCurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }} />
        </PanelNoBackground>
    );
};
