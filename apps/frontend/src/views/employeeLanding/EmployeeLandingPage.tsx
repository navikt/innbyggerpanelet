import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { useFilterInsightProjects } from '../../core/hooks/useEmployeeLanding';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    const { user, loading, error } = useUser();

    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    return (
        <PanelNoBackground className={style.employeeLandingPageContainer}>
            <Link to="/profil">
                <EmployeeInfo name={user?.name} />
            </Link>
            <div className={style.newProjectButtonContaner}></div>
            <CurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }} />
        </PanelNoBackground>
    );
}
