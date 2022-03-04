import { ChangeEvent, ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Button, Label, Textarea, TextField } from '@navikt/ds-react';
import { Datepicker } from '@navikt/ds-datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import style from './Project.module.scss';
import ProjectTeam from '../projectTeam';
import { format, toDate } from 'date-fns';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';

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
    const handleDateChange = (value: DatepickerValue, id: string) => {
        const newProject = { ...project};
        newProject[id] = value;
        setProject(newProject);
    };
    
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
            <Label >Startdato:</Label>
            <Datepicker
                value={project.start}
                onChange={(value) => handleDateChange(value, 'start')}
            />
            <Label >Sluttdato:</Label>
            <Datepicker
                value={project.end}
                onChange={(value) => handleDateChange(value, 'end')}
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
