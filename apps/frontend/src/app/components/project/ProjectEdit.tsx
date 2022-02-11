import { ChangeEvent, ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Button, Textarea, TextField } from '@navikt/ds-react';

import style from './Project.module.scss';
import ProjectTeam from '../projectTeam';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    submit: (project: IInsightProject) => void;
    loading: boolean;
}

export const ProjectEdit = ({
    project,
    setProject,
    submit,
    loading,
}: IProps): ReactElement => {
    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newProject = { ...project };
        newProject[event.target.id] = event.target.value;
        setProject(newProject);
    };

    return (
        <form className={style.projectEdit}>
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
                id="start"
                label="Startdato:"
                value={project.start}
                onChange={handleInputChange}
            />
            <TextField
                id="end"
                label="Sluttdato:"
                value={project.end}
                onChange={handleInputChange}
            />
            <ProjectTeam project={project} edit={setProject} />
            <Button
                loading={loading}
                onClick={(e) => {
                    e.preventDefault();
                    submit(project);
                }}>
                Bekreft
            </Button>
        </form>
    );
};
