import { ReactElement, useState } from 'react';
import { IProject } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import {
    ProjectOverview,
    ProjectEdit,
    ProjectInsightEntry,
} from '../../components/project';

const defaultProject: IProject = {
    name: 'Prosjekttittel',
    description: 'Midlertidig beskrivelse',
    starts: 'DD-MM-ÅÅÅÅ',
    insights: [
        {
            name: 'test',
            description: 'beskrivelse',
            starts: 'DD-MM-ÅÅÅÅ',
            ends: 'DD-MM-ÅÅÅÅ',
            candidates: [{ id: 1, name: 'Ole Brumm', traits: [] }],
            traits: [{ id: 1, name: ' Må være 25 år ' }],
            consents: [{ id: 1, name: 'Godtar taleopptak' }],
        },
    ],
};

export const Project = (): ReactElement => {
    const [project, setProject] = useState<IProject>(defaultProject);
    const [edit, setEdit] = useState(false);

    return (
        <Panel>
            <Button onClick={() => setEdit(!edit)}>Rediger</Button>
            {edit ? (
                <ProjectEdit project={project} setProject={setProject} />
            ) : (
                <ProjectOverview project={project} />
            )}
            <Panel>
                <ProjectInsightEntry insight={project.insights[0]} />
            </Panel>
        </Panel>
    );
};
