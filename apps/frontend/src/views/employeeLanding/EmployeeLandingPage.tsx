import { IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement, useState } from 'react';
import { useUser } from '../../api/hooks';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import OngoingInsight from '../../components/employeeLanding/OngoingInsight';
import { useFilterInsightProjects } from '../../core/hooks/useEmployeeLanding';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    const [user, setUser] = useState<IUser | undefined>(useUser().user);
    
    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    const [insights, setInsights] = useState<IInsight[]>([]);
    
    return (
        <div>
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name={user?.name}/>
                <OngoingInsight userInsight={insights}/>
                <CurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }}/>
            </div>
        </div>
    );
}