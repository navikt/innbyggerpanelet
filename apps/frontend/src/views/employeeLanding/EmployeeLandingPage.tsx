import React, { ReactElement } from 'react';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import EmployeeNavbar from '../../components/employeeLanding/EmployeeNavbar';
import OngoingInsightWork from '../../components/employeeLanding/OngoingInsightWork';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    return (
        <div>
            <EmployeeNavbar />
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name='Emil Elton Nilsen'/>
                <OngoingInsightWork />
            </div>
        </div>
    );
}