import { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import { useInsightProjectById } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { EmployeeProjectDetails } from '../components';
import { EmployeeInsightProjectEntryList } from '../containers';

export const EmployeeInsightProjectDetailPage = (): ReactElement => {
    const { id } = useParams();
    const { insightProject, loading, error } = useInsightProjectById(id || 0);

    if (!insightProject) return <APIHandler error={error} loading={loading} />;

    return (
        <>
            <EmployeeProjectDetails project={insightProject} />

            <EmployeeInsightProjectEntryList projectId={insightProject.id} />
        </>
    );
};
