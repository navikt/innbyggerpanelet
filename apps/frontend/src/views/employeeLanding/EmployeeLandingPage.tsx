import React, { ReactElement } from 'react';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import EmployeeNavbar from '../../components/employeeLanding/EmployeeNavbar';


export default function EmployeeLandingPage(): ReactElement {
    return (
        <div>
            <EmployeeNavbar />
            <div>
                <EmployeeInfo name='Emil Elton Nilsen'/>
            </div>
        </div>
    );
}