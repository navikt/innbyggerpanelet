import { FC } from 'react';
import { Heading } from '@navikt/ds-react';
import { Candidate, Trait } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

interface IProps {
    name: string;
}

const candidates: Candidate[] = [
    {
        name: 'Ola Nordmann',
    },
];

const traits: Trait[] = [{ name: 'Er under 25 år', id: 1 }];

export const CreateInsight: FC<IProps> = () => {
    return (
        <>
            <Heading level={'1'} size="2xlarge" spacing>
                Nytt innsiktsarbeid
            </Heading>
            <InsightConfiguration id={1} />
            <Heading level={'2'} size="xlarge" spacing>
                Kandidater
            </Heading>
            <CandidatePicker
                candidate={candidates[0]}
                relevantTraits={traits}
            />
        </>
    );
};
