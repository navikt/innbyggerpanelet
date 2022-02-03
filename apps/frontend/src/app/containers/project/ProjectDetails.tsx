import { BodyLong, BodyShort, Heading, Label, Loader } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { ProjectTeamMember } from '../../components/project';
import { useInsightProjectMembers } from '../../api/hooks/useInsightProject';
import { APIError } from '../../components/misc/apiError/APIError';

interface IProps {
    project: IInsightProject;
}

export const ProjectDetails = ({ project }: IProps): ReactElement => {
    const { members, isLoading, isError } = useInsightProjectMembers(
        project.id
    );

    if (isError) return <APIError error={isError} />;

    if (isLoading || !members) return <Loader />;

    return (
        <>
            <Heading size="2xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Startdato: </Label>
            <BodyShort>{project.start}</BodyShort>
            <Label>Teammedlemmer: </Label>
            <div>
                {members.map((member, index) => (
                    <ProjectTeamMember key={index} member={member} />
                ))}
            </div>
        </>
    );
};
