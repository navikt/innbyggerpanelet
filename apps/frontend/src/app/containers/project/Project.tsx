import { ReactElement, useState } from 'react';
import { IInsight, IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Button, Label, Panel } from '@navikt/ds-react';
import {
    ProjectOverview,
    ProjectEdit,
    ProjectInsightEntry,
} from '../../components/project';
import { mocks } from '../../utils/mocks';

export const Project = (): ReactElement => {
    // Query for project and insights related to project
    const [project, setProject] = useState<IInsightProject>(
        mocks.primaryProject
    );
    const [insights, setInsights] = useState<IInsight[]>([
        mocks.primaryInsight,
    ]);

    const [edit, setEdit] = useState(false);

    return (
        <>
            <Panel>
                <Button onClick={() => setEdit(!edit)}>Rediger</Button>
                {edit ? (
                    <ProjectEdit project={project} setProject={setProject} />
                ) : (
                    <ProjectOverview project={project} />
                )}
            </Panel>
            <Panel>
                <Label>Antall innsiktsarbeid: {insights.length}</Label>
                {insights.map((insight, index) => (
                    <ProjectInsightEntry key={index} insight={insight} />
                ))}
            </Panel>
        </>
    );
};
