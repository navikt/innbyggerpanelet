import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Loader } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useInsightProjects } from '../../api/hooks/useInsightProject';
import { APIError } from '../../components/misc/apiError/APIError';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { InsightProjectTile } from '../../components/project';
import { mocks } from '../../utils/mocks';

import style from './Project.module.scss';

export const InsightProjectOverview = (): ReactElement => {
    const { insightProjects, isLoading, isError } = useInsightProjects();

    if (isError) return <APIError error={isError} />;

    if (isLoading || !insightProjects) return <Loader />;

    return (
        <PanelNoBackground className={style.tileWrapper}>
            {insightProjects.map((project, index) => (
                <InsightProjectTile key={index} insightProject={project} />
            ))}
        </PanelNoBackground>
    );
};
