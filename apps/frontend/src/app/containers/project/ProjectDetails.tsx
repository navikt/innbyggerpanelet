import { BodyLong, BodyShort, Heading, Label, Loader } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import ProjectTeam from '../../components/projectTeam';

import style from './Project.module.scss';

interface IProps {
    project: IInsightProject;
}

export const ProjectDetails = ({ project }: IProps): ReactElement => {
    return (
        <div className={style.detailWrapper}>
            <Heading size="2xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Startdato: </Label>
            <BodyShort>{project.start}</BodyShort>
            <ProjectTeam project={project} />
        </div>
    );
};
