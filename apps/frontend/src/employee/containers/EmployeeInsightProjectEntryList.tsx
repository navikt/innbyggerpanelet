import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProjectInsightEntry } from '.';
import { useInsightsByProjectId } from '../../api/hooks/useInsight';
import { APIHandler } from '../../common/components/apiHandler';
import style from './containers.module.scss';

interface IProps {
    projectId: number;
}

export const EmployeeInsightProjectEntryList = ({ projectId }: IProps): ReactElement => {
    const navigate = useNavigate();
    const { insights, loading, error } = useInsightsByProjectId(projectId);

    return (
        <Panel>
            <Button onClick={() => navigate('innsikt')}>Nytt innsiktsarbeid</Button>
            <div className={style.insightHeader}>
                <Heading size="large">Innsiktsarbeid</Heading>
                <Label>Antall innsiktsarbeid: {insights?.length || 0}</Label>
            </div>
            {insights?.map((insight, index) => <ProjectInsightEntry key={index} insight={insight} />) || (
                <APIHandler error={error} loading={loading} />
            )}
        </Panel>
    );
};
