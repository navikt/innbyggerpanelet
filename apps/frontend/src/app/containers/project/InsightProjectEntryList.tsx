import { Heading, Label, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useInsightsByProjectId } from '../../api/hooks/useInsight';
import { APIError } from '../../components/misc/apiError/APIError';
import { ProjectInsightEntry } from '../../components/project';

import style from './Project.module.scss';

interface IProps {
    projectId: number;
}

export const InsightProjectEntryList = ({
    projectId,
}: IProps): ReactElement => {
    const { insights, isLoading, isError } = useInsightsByProjectId(projectId);

    if (isError) return <APIError error={isError} />;

    if (isLoading || !insights) return <Loader />;

    return (
        <Panel>
            <div className={style.insightHeader}>
                <Heading size="large">Innsiktsarbeid</Heading>
                <Label>Antall innsiktsarbeid: {insights.length}</Label>
            </div>
            {insights.map((insight, index) => (
                <ProjectInsightEntry key={index} insight={insight} />
            ))}
        </Panel>
    );
};
