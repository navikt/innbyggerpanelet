import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Link } from '@navikt/ds-react';
import React, { ReactElement, useState } from 'react';
import { useUser } from '../../api/hooks';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
import { useFilterInsightProjects } from '../../core/hooks/useEmployeeLanding';
import style from './EmployeeLandingPage.module.scss';

export default function EmployeeLandingPage(): ReactElement {
    const [user, setUser] = useState<IUser | undefined>(useUser().user);
    
    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    
    return (
        <div>
            <div className={style.employeeLandingPageContainer}>
                <EmployeeInfo name={user?.name}/>
                <div className={style.newProjectButtonContaner}>
                    <Link href='/#/prosjekt/ny'>
                        <Button variant='primary' size='medium'>Opprett nytt prosjekt</Button>
                    </Link>
                </div>
                <CurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }}/>
            </div>
        </div>
    );
}