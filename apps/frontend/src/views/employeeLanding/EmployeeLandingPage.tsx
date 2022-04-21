import { IInsight } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement } from 'react';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import EmployeeNavbar from '../../components/employeeLanding/EmployeeNavbar';
import OngoingInsight from '../../components/employeeLanding/OngoingInsight';
import style from './EmployeeLandingPage.module.scss';

const insightMock: IInsight[] = [{
    id: 1,
    name: 'Skjermleser for blinde',
    description: 'Testy testy descriptioni',
    start: '02.02.2022',
    end: '23.04.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    }
},
{
    id: 1,
    name: 'Testing av ny dagpengeløsning',
    description: 'Testy testy descriptioni',
    start: '22.06.2022',
    end: '30.08.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    } 
},
{
    id: 1,
    name: 'Testing av ny foreldrepengeløsning',
    description: 'Testy testy descriptioni',
    start: '02.02.2022',
    end: '23.04.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    } 
}];

export default function EmployeeLandingPage(): ReactElement {
    return (
        <div>
            <EmployeeNavbar />
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name='Emil Elton Nilsen'/>
                <OngoingInsight userInsight={insightMock}/>
                <CurrentProjects />
            </div>
        </div>
    );
}