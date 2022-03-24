import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Datepicker } from '@navikt/ds-datepicker';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import { Button, Label, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { validateInsightProject, IInsightPojectErrors } from '../../validation/insightPoject';
import ErrorList from '../misc/validation/ErrorList';
import ProjectTeam from '../projectTeam';
import style from './Project.module.scss';

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
    const [errorMessages, setErrorMessages] = useState<IInsightPojectErrors>(
        {
            nameErrorMsg: '',
            descriptionErrorMsg: '',
            datesErrorMsg: [],
            projectTeamErrorMsg: ''
        }
    );
    
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
    
    const onProjectSubmit = () => {
        if (validateInsightProject(project).isValid) {
            submit(project);
        } else {
            setErrorMessages(validateInsightProject(project).errorMesseges);
        }
    };

    return (
        <form className={style.projectEdit}>
            <TextField
                id="name"
                label="Navn:"
                value={project.name}
                onChange={handleInputChange}
                error={errorMessages.nameErrorMsg}
            />
            <Textarea
                id="description"
                label="Beskrivelse:"
                value={project.description}
                onChange={handleInputChange}
                error={errorMessages.descriptionErrorMsg}
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
            {errorMessages.datesErrorMsg && (
                <ErrorList errorMessages={errorMessages.datesErrorMsg}/>
            )}
            <ProjectTeam project={project} edit={setProject} />
            {errorMessages.projectTeamErrorMsg && (
                <ErrorList errorMessages={[errorMessages.projectTeamErrorMsg]}/>
            )}
            <Button
                loading={loading}
                onClick={(e) => {
                    e.preventDefault();
                    onProjectSubmit();
                }}>
                Bekreft
            </Button>
        </form>
    );
};
