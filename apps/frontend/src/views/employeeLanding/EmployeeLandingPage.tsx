import React, { ReactElement } from 'react';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import EmployeeNavbar from '../../components/employeeLanding/EmployeeNavbar';
import OngoingInsight from '../../components/employeeLanding/OngoingInsight';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    return (
        <div>
            <EmployeeNavbar />
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name='Emil Elton Nilsen'/>
                <OngoingInsight />
                <CurrentProjects />
            </div>
        </div>
    );
}