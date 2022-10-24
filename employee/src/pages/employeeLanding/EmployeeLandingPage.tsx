import React, { ReactElement } from 'react'
import { PageHeader } from '../../components/common/pageHeader/PageHeader'
import { People } from '@navikt/ds-icons'
import { useUser } from '../../api/hooks/useUser'
import { ICitizen, IEmployee } from '../../types'
import { useFilterInsightProjects } from './hooks/useEmployeeLanding'
import style from './EmployeeLandingPage.module.scss'
import { PanelNoBackground } from '../../components/common/panelNoBackground/PanelNoBackground'
import { EmployeeCurrentProjects } from '../../container/employeeCurrentProjects/EmployeeCurrentProjects'

export const EmployeeLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<IEmployee>()

    const { onGoingProjects, futureProjects, completedProjects } = useFilterInsightProjects()
    console.log(user)
    return (
        <>
            <PageHeader title={user?.firstname + ' ' + user?.surname} icon={<People />} />
            <PanelNoBackground className={style.employeeLandingPageContainer}>
                <EmployeeCurrentProjects filteredProjects={{ onGoingProjects, futureProjects, completedProjects }} />
            </PanelNoBackground>
        </>
    )
}