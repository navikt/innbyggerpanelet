import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { BodyLong, BodyShort, Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import style from './CitizenCandidature.module.scss';

interface IProps {
    candidate: ICandidate;
}

export const CitizenCandidature = ({ candidate }: IProps): ReactElement => {
    const { insight, status, relevancyGrading } = candidate;

    return (
        <Panel className={style.wrapper}>
            <Heading size="large">{insight.name}</Heading>
            <BodyLong>{insight.description}</BodyLong>
            <div>
                <Label>Prosjekt</Label>
                <BodyShort>{insight.project.name}</BodyShort>
            </div>
            <div>
                <Label>Periode</Label>
                <BodyShort>{insight.start + ' til ' + insight.end}</BodyShort>
            </div>
            <div>
                <Label>Din status</Label>
                <BodyShort>{status}</BodyShort>
            </div>
            <div>
                <Label>Din relevansgradering</Label>
                <BodyShort>{relevancyGrading * 100}%</BodyShort>
            </div>
            <Link to={`/innbygger/innsikt/${insight.id}`}>
                <Button as="div" variant="secondary">
                    Oppdater samtykkeskjema
                </Button>
            </Link>
        </Panel>
    );
};
