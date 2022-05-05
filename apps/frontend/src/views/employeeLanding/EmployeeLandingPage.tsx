import { IInsight, IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement, useState } from 'react';
import { useInsightProjectByCurrentUser, useUser } from '../../api/hooks';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import OngoingInsight from '../../components/employeeLanding/OngoingInsight';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    
    const [user, setUser] = useState<IUser | undefined>(useUser().user);
    const { insightProjects, loading, error} = useInsightProjectByCurrentUser(user?.id);
    
    const [currentInsightProjects, setCurrentInsightProjects] = useState<IInsightProject[]>([]);
    const [userInsight, setUserInsight] = useState<IInsight[]>([]);
    

    return (
        <div>
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name={user?.name}/>
                <OngoingInsight userInsight={userInsight}/>
                <CurrentProjects projects={insightProjects!}/>
            </div>
        </div>
    );
}