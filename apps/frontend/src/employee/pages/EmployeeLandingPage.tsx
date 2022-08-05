import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { People } from '@navikt/ds-icons';
import { ReactElement } from 'react';
import { useUser } from '../../common/api/hooks';
import { PageHeader } from '../../common/components/pageHeader';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import { EmployeeCurrentProjects } from '../containers';
import { useFilterInsightProjects } from '../hooks/useEmployeeLanding';
import style from './EmployeeLandingPage.module.scss';

export const EmployeeLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects();

    return (
        <>
            <PageHeader title={user?.firstname + ' ' + user?.surname} icon={<People />} />
            <PanelNoBackground className={style.employeeLandingPageContainer}>
                <EmployeeCurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }} />
            </PanelNoBackground>
        </>
    );
};
