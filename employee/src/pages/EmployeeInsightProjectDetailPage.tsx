import React, { ReactElement } from 'react'
import { useParams } from 'react-router-dom'
import { useInsightProjectById } from '../api/hooks/useInsightProject'
import { APIHandler } from '../components/common/apiHandler/APIHandler'
import { EmployeeProjectDetails } from '../components/employeeProjectDetails/EmployeeProjectDetails'
import { EmployeeInsightProjectEntryList } from '../container/employeeInsightProjectEntryList/EmployeeInsightProjectEntryList'

export const EmployeeInsightProjectDetailPage = (): ReactElement => {
    const { id } = useParams()
    const { insightProject, loading, error } = useInsightProjectById(id || 0)

    if (!insightProject) return <APIHandler error={error} loading={loading} />

    return (
        <>
            <EmployeeProjectDetails project={insightProject} />
            <EmployeeInsightProjectEntryList projectId={insightProject.id} />
        </>
    )
}
