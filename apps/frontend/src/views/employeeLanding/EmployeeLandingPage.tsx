import { IInsight, IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement, useState } from 'react';
import { useInsightProjectByCurrentUser, useUser } from '../../api/hooks';
import CurrentProjects from '../../components/employeeLanding/CurrentProjects';
import EmployeeInfo from '../../components/employeeLanding/EmployeeInfo';
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

const projectMock: IInsightProject[] = [{
    id: 1,
    name: 'Justerbart kjøkken',
    description: 'Et tilltak for de som sliter med normale høyder på kjøkkeninstalasjoner',
    members: [],
    start: '01.01.2022',
    end: '23.03.2022'
},
{
    id: 1,
    name: 'Utvidet barnetrygd',
    description: 'Et tillig til ordinær barnetrygd når du er alene med barn under 18 år',
    members: [],
    start: '02.02.2022',
    end: '23.04.2022'
},
{
    id: 1,
    name: 'Pleiepenger i livets sluttfase',
    description: 'Sikrer deg inntekt når du må være borte fra jobb for å ta vare på en person som er i livets siste fase',
    members: [],
    start: '02.02.2022',
    end: '23.04.2022'
},
{
    id: 1,
    name: 'Alderspensjon',
    description: 'Alderspensjon fra folketrygden er en ordning som sikrer deg inntekt når du blir pensjonist',
    members: [],
    start: '22.06.2022',
    end: '30.08.2022'
},
{
    id: 1,
    name: 'Bidrag til særlige utgifter',
    description: 'Den andre forelderen betaler sin del av utgifter som tannregulering, konfirmasjon og briller',
    members: [],
    start: '02.02.2022',
    end: '23.04.2022'
}];

export default function EmployeeLandingPage(): ReactElement {
    
    const [user, setUser] = useState<IUser | undefined>(useUser().user);
    const { insightProjects, loading, error} = useInsightProjectByCurrentUser(user?.id);
    
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