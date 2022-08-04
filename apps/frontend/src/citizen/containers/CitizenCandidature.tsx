import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
    candidate: ICandidate;
}

export const CitizenCandidature = ({ candidate }: IProps): ReactElement => {
    const { insight, status, relevancyGrading } = candidate;

    return (
        <Panel>
            <Heading size="large">{insight.name}</Heading>
            <BodyLong>{insight.description}</BodyLong>
            <ul>
                <li>Prosjekt: {insight.project.name}</li>
                <li>Periode: {insight.start + ' til ' + insight.end}</li>
                <li>Din status: {status}</li>
                <li>Din relevansgradering: {relevancyGrading * 100}%</li>
            </ul>
            <Link to={`/innbygger/innsikt/${insight.id}`}>Oppdater samtykkeskjema</Link>
        </Panel>
    );
};
