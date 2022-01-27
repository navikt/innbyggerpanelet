import { ChangeEvent, ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Label, Textarea, TextField } from '@navikt/ds-react';
import { ProjectTeamMember } from '.';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
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
        <>
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
            <TextField
                id="starts"
                label="Startdato:"
                value={project.start}
                onChange={handleInputChange}
            />
            <Label>Teammedlemmer: </Label>
            <div>
                {project.members.map((member, index) => (
                    <ProjectTeamMember key={index} member={member} />
                ))}
            </div>
        </>
    );
};
