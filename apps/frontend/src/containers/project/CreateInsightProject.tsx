import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInsightProject } from '../../api/mutations/mutateInsightProject';
import { ProjectEdit } from '../../components/project';
import { useValidationErrors } from '../../core/hooks/useValidationErrors';

const defaultProject: IInsightProject = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    members: []
};

export const CreateInsightProject = (): ReactElement => {
    const navigate = useNavigate();

    const [insightProject, setInsightProject] = useState(defaultProject);
    const [insightProjectValidationErrors, setInsightProjectValidationErrors] = useValidationErrors();

    const handleSubmit = async (project: IInsightProject) => {
        const { response, error, validationErrors } = await createInsightProject(project);
        if (error) throw new Error('Failed to post insight project.');
        if (validationErrors) return setInsightProjectValidationErrors(validationErrors);

        if (response) navigate(`/prosjekt/${response.id}`);
    };

    return (
        <Panel>
            <ProjectEdit
                project={insightProject}
                setProject={setInsightProject}
                submit={handleSubmit}
                validationErrors={insightProjectValidationErrors}
            />
        </Panel>
    );
};
