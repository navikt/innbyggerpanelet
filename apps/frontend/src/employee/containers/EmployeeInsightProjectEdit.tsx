import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Datepicker } from '@navikt/ds-datepicker';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import { BodyShort, Button, Label, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';
import ErrorList from '../../components/misc/validation/ErrorList';
import { IValidationError } from '../../core/hooks/useFormatValidationErrors';
import style from './containers.module.scss';
import { ProjectTeam } from './ProjectTeam';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    submit: (project: IInsightProject) => void;
    validationErrors: IValidationError;
}

export const EmployeeInsightProjectEdit = ({ project, setProject, submit, validationErrors }: IProps): ReactElement => {
    const handleDateChange = (value: DatepickerValue, id: string) => {
        const newProject = { ...project };
        newProject[id] = value;
        setProject(newProject);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                error={validationErrors.name}
            />
            <Textarea
                id="description"
                label="Beskrivelse:"
                value={project.description}
                onChange={handleInputChange}
                error={validationErrors.description}
            />
            <Label>Prosjektperiode:</Label>
            <div className={style.dates}>
                <Datepicker value={project.start} onChange={(value) => handleDateChange(value, 'start')} />
                <BodyShort>til</BodyShort>
                <Datepicker value={project.end} onChange={(value) => handleDateChange(value, 'end')} />
            </div>
            <div>
                {validationErrors.start && <ErrorList errorMessages={[...validationErrors.start]} />}
                {validationErrors.end && <ErrorList errorMessages={[...validationErrors.end]} />}
            </div>
            <ProjectTeam project={project} edit={setProject} />
            {validationErrors.members && <ErrorList errorMessages={[...validationErrors.members]} />}
            <Button
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
