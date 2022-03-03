import { ReactElement, useState } from 'react';
import { Panel } from '@navikt/ds-react';
import { ProjectEdit } from '../../components/project';
import { useNavigate } from 'react-router-dom';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { createInsightProject } from '../../api/mutations/mutateInsightProject';
import style from './Project.module.scss';
import { isInsightProjectValid } from '../../../validation/insightPoject/validateInsightProject';

const defaultProject: IInsightProject = {
    id: 0,
    name: '',
    description: '',
    start: new Date(),
    end: new Date(),
    members: []
};

export const CreateInsightProject = (): ReactElement => {
    const [insightProject, setInsightProject] = useState(defaultProject);
    const [posting, setPosting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (project: IInsightProject) => {
        const { response, isLoading, isError } = await createInsightProject(project);

        //isInsightProjectValid(insightProject).isValid

        if (response) {
            navigate(`/prosjekt/${response.id}`);
        } else if (isLoading) {
            setPosting(true);
        } else if (isError) {
            console.error(isError);
        }
    };

    return (
        <Panel>
            <ProjectEdit
                project={insightProject}
                setProject={setInsightProject}
                submit={handleSubmit}
                loading={posting}
            />
        </Panel>
    );
};
