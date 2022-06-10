import { Button, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInsightProjectById } from '../../api/hooks/useInsightProject';
import { APIHandler } from '../../components/misc/apiHandler';
import { ProjectEdit } from '../../components/project';
import { InsightProjectEntryList } from './InsightProjectEntryList';
import { ProjectDetails } from './ProjectDetails';

export const InsightProject = (): ReactElement => {
    const { id } = useParams();
    const { insightProject, loading, error } = useInsightProjectById(id || 0);
    const [edit, setEdit] = useState(false);

    if (!insightProject) return <APIHandler error={error} loading={loading} />;

    return (
        <>
            <Panel>
                <Button onClick={() => setEdit(!edit)}>Rediger</Button>
                {edit ? (
                    <ProjectEdit
                        project={insightProject}
                        setProject={() => null}
                        submit={() => null}
                        validationErrors={{}}
                    />
                ) : (
                    <ProjectDetails project={insightProject} />
                )}
            </Panel>
            <InsightProjectEntryList projectId={insightProject.id} />
        </>
    );
};
