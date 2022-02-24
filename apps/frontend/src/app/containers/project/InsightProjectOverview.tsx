import { ReactElement } from 'react';
import { useInsightProjects } from '../../api/hooks/useInsightProject';
import { APIHandler } from '../../components/misc/apiHandler/APIHandler';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { InsightProjectTile } from '../../components/project';

import style from './Project.module.scss';

export const InsightProjectOverview = (): ReactElement => {
    const { insightProjects, loading, error } = useInsightProjects();

    return (
        <PanelNoBackground className={style.tileWrapper}>
            {insightProjects?.map((project, index) => <InsightProjectTile key={index} insightProject={project} />) || (
                <APIHandler loading={loading} error={error} />
            )}
        </PanelNoBackground>
    );
};
