import { BodyLong, BodyShort, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { IProject } from '@innbyggerpanelet/api-interfaces';

interface IProps {
    project: IProject;
}

export const ProjectOverview = ({ project }: IProps): ReactElement => {
    return (
        <Panel>
            <Heading size="2xlarge">{project.name}</Heading>
            <BodyLong>{project.description}</BodyLong>
            <Label>Antall innsiktsarbeid: </Label>
            <BodyShort>{project.insights.length}</BodyShort>
            <Label>Startdato: </Label>
            <BodyShort>{project.starts}</BodyShort>
            <Label>Teammedlemmer: </Label>
            <BodyShort>TODO</BodyShort>
        </Panel>
    );
};
