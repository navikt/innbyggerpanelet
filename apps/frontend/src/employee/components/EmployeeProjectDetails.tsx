import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { ProjectTeam } from '../containers';
import style from './EmployeeProjectDetails.module.scss';

interface IProps {
    project: IInsightProject;
}

export const EmployeeProjectDetails = ({ project }: IProps): ReactElement => {
    return (
        <div className={style.detailWrapper}>
            <Heading size="xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Startdato: </Label>
            <BodyShort>{project.start}</BodyShort>
            <Label>Startdato: </Label>
            <BodyShort>{project.end}</BodyShort>
            <ProjectTeam project={project} />
        </div>
    );
};
