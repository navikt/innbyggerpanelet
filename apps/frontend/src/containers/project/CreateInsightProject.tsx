import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendSms } from '../../api/hooks/useSms';
import { createInsightProject } from '../../api/mutations/mutateInsightProject';
import { ProjectEdit } from '../../components/project';

const defaultProject: IInsightProject = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    members: []
};

export const CreateInsightProject = (): ReactElement => {
    const [insightProject, setInsightProject] = useState(defaultProject);
    const [posting, setPosting] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (project: IInsightProject) => {
        const smsRes = await sendSms({birthNumber: '04069828995', message: 'hello world'});
        const { response, isLoading, isError } = await createInsightProject(project);

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
