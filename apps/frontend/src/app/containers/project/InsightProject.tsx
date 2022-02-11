import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Loader, Panel } from '@navikt/ds-react';
import { ProjectEdit } from '../../components/project';
import { useInsightProjectById } from '../../api/hooks/useInsightProject';
import { APIError } from '../../components/misc/apiError/APIError';
import { ProjectDetails } from './ProjectDetails';

import { InsightProjectEntryList } from './InsightProjectEntryList';

export const InsightProject = (): ReactElement => {
    const { id } = useParams();

    const { insightProject, isLoading, isError } = useInsightProjectById(
        id || 0
    );

    const [edit, setEdit] = useState(false);

    if (isError) return <APIError error={isError} />;
    if (isLoading || !insightProject) return <Loader />;

    return (
        <>
            <Panel>
                <Button onClick={() => setEdit(!edit)}>Rediger</Button>
                {edit ? (
                    <ProjectEdit
                        project={insightProject}
                        setProject={() => null}
                        submit={() => null}
                        loading={false}
                    />
                ) : (
                    <ProjectDetails project={insightProject} />
                )}
            </Panel>
            <InsightProjectEntryList projectId={insightProject.id} />
        </>
    );
};
