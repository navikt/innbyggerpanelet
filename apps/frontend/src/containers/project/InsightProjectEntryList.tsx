import { Button, Heading, Label, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInsightsByProjectId } from '../../api/hooks/useInsight';
import { APIError } from '../../components/misc/apiError/APIError';
import { APIHandler } from '../../components/misc/apiHandler/APIHandler';
import { ProjectInsightEntry } from '../../components/project';

import style from './Project.module.scss';

interface IProps {
    projectId: number;
}

export const InsightProjectEntryList = ({ projectId }: IProps): ReactElement => {
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
