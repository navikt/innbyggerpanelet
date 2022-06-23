import { Button, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useInsightProjectById } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { ProjectDetails } from '../components';
import { EmployeeInsightProjectEdit, EmployeeInsightProjectEntryList } from '../containers';

export const EmployeeInsightProjectDetailPage = (): ReactElement => {
    const { id } = useParams();
    const { insightProject, loading, error } = useInsightProjectById(id || 0);
    const [edit, setEdit] = useState(false);

    if (!insightProject) return <APIHandler error={error} loading={loading} />;

    return (
        <>
            <Panel>
                <Button onClick={() => setEdit(!edit)}>Rediger</Button>
                {edit ? (
                    <EmployeeInsightProjectEdit
                        project={insightProject}
                        setProject={() => null}
                        submit={() => null}
                        validationErrors={{}}
                    />
                ) : (
                    <ProjectDetails project={insightProject} />
                )}
            </Panel>
            <EmployeeInsightProjectEntryList projectId={insightProject.id} />
        </>
    );
};
