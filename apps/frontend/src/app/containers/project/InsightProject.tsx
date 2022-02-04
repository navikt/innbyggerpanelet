import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Label, Loader, Panel } from '@navikt/ds-react';
import { ProjectEdit, ProjectInsightEntry } from '../../components/project';
import { useInsightProjectById } from '../../api/hooks/useInsightProject';
import { APIError } from '../../components/misc/apiError/APIError';
import { ProjectDetails } from './ProjectDetails';

import { mocks } from '../../utils/mocks';

import style from './Project.module.scss';
import { InsightProjectEntryList } from './InsightProjectEntryList';

export const InsightProject = (): ReactElement => {
    const { id } = useParams();

    const { insightProject, isLoading, isError } = useInsightProjectById(
        id || 0
    );

    const [insights, setInsights] = useState<IInsight[]>([
        mocks.primaryInsight,
    ]);

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
                    />
                ) : (
                    <ProjectDetails project={insightProject} />
                )}
            </Panel>
            <InsightProjectEntryList projectId={insightProject.id} />
        </>
    );
};
