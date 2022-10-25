import { Panel } from '@navikt/ds-react'
import { AxiosError } from 'axios'
import React, { ReactElement, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createInsightProject } from '../api/mutations/mutateInsightProject'
import { APIHandler } from '../components/common/apiHandler/APIHandler'
import { EmployeeInsightProjectEdit } from '../container/employeeInsightProjectEdit/EmployeeInsightProjectEdit'
import { useFormatValidationErrors } from '../hooks/useFormatValidationErrors'
import { IInsightProject } from '../types'

const defaultProject: IInsightProject = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    members: []
}

export const EmployeeInsightProjectCreationPage = (): ReactElement => {
    const navigate = useNavigate()

    const [insightProject, setInsightProject] = useState(defaultProject)
    const [insightProjectValidationErrors, setInsightProjectValidationErrors] = useFormatValidationErrors()
    const [postError, setPostError] = useState<AxiosError>()

    const handleSubmit = async (project: IInsightProject) => {
        const { response, error, validationErrors } = await createInsightProject(project)
        if (error) return setPostError(error)
        if (validationErrors) return setInsightProjectValidationErrors(validationErrors)

        if (response) navigate(`/prosjekt/${response.id}`)
    }

    return (
        <Panel>
            <EmployeeInsightProjectEdit
                project={insightProject}
                setProject={setInsightProject}
                submit={handleSubmit}
                validationErrors={insightProjectValidationErrors}
            />
            {postError && <APIHandler loading={false} error={postError} />}
        </Panel>
    )
}
