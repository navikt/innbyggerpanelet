import { BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { ProjectTeamMember } from './';

interface IProps {
    project: IInsightProject;
}

export const ProjectOverview = ({ project }: IProps): ReactElement => {
    return (
        <>
            <Heading size="2xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Startdato: </Label>
            <BodyShort>{project.start}</BodyShort>
            <Label>Teammedlemmer: </Label>
            <div>
                {project.members.map((member, index) => (
                    <ProjectTeamMember key={index} member={member} />
                ))}
            </div>
        </>
    );
};
