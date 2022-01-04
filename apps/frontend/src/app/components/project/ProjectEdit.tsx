import { ChangeEvent, ReactElement } from 'react';
import { IProject } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Label, Panel, Textarea, TextField } from '@navikt/ds-react';

interface IProps {
    project: IProject;
    setProject: (project: IProject) => void;
}

export const ProjectEdit = ({ project, setProject }: IProps): ReactElement => {
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newProject = { ...project };
        newProject[event.target.id] = event.target.value;
        setProject(newProject);
    };

    return (
        <Panel>
            <TextField
                id="name"
                label="Navn:"
                value={project.name}
                onChange={handleInputChange}
            />
            <Textarea
                id="description"
                label="Beskrivelse:"
                value={project.description}
                onChange={handleInputChange}
            />
            <Label>Antall innsiktsarbeid: </Label>
            <BodyShort>{project.insights.length}</BodyShort>
            <TextField
                id="starts"
                label="Startdato:"
                value={project.starts}
                onChange={handleInputChange}
            />
            <Label>Teammedlemmer: </Label>
            <BodyShort>TODO</BodyShort>
        </Panel>
    );
};
