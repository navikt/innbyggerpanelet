import { BodyLong, BodyShort, Heading, Label, Loader } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { useInsightProjectMembers } from '../../api/hooks/useInsightProject';
import { APIError } from '../../components/misc/apiError/APIError';
import ProjectTeam from '../../components/projectTeam';

interface IProps {
    project: IInsightProject;
}

export const ProjectDetails = ({ project }: IProps): ReactElement => {
    return (
        <>
            <Heading size="2xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Startdato: </Label>
            <BodyShort>{project.start}</BodyShort>
            <ProjectTeam project={project} />
        </>
    );
};
