import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Datepicker } from '@navikt/ds-datepicker';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';
import { BodyShort, Button, Label, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';
import ProjectTeam from '../projectTeam';
import style from './Project.module.scss';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    submit: (project: IInsightProject) => void;
    loading: boolean;
}

export const ProjectEdit = ({ project, setProject, submit, loading }: IProps): ReactElement => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newProject = { ...project };
        newProject[event.target.id] = event.target.value;
        setProject(newProject);
    };

    const handleDateChange = (value: DatepickerValue, id: string) => {
        const newProject = { ...project };
        newProject[id] = value;
        setProject(newProject);
    };

    return (
        <form className={style.projectEdit}>
            <TextField id="name" label="Navn:" value={project.name} onChange={handleInputChange} />
            <Textarea id="description" label="Beskrivelse:" value={project.description} onChange={handleInputChange} />
            <div>
                <Label>Innsiktsperiode</Label>
                <div className={style.dates}>
                    <Datepicker value={project.start} onChange={(value) => handleDateChange(value, 'start')} />
                    <BodyShort>til</BodyShort>
                    <Datepicker value={project.end} onChange={(value) => handleDateChange(value, 'end')} />
                </div>
            </div>
            <ProjectTeam project={project} edit={setProject} />
            <Button
                loading={loading}
                onClick={(e) => {
                    e.preventDefault();
                    submit(project);
                }}
            >
                Bekreft
            </Button>
        </form>
    );
};
