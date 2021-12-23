import { FC, useState } from 'react';
import { Heading } from '@navikt/ds-react';
import { Candidate, Insight } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

const candidates: Candidate[] = [
    {
        id: 1,
        name: 'Ola Nordmann',
        traits: [{ id: 12, name: 'Hello' }],
    },
];

const defaultInsight: Insight = {
    name: '',
    description: '',
    starts: '',
    ends: '',
    candidates: [],
    traits: [],
    consents: [],
};

export const CreateInsight: FC = () => {
    const [insight, setInsight] = useState<Insight>(defaultInsight);

    return (
        <>
            <Heading level={'1'} size="2xlarge" spacing>
                Nytt innsiktsarbeid
            </Heading>
            <InsightConfiguration insight={insight} setInsight={setInsight} />
            <Heading level={'2'} size="xlarge" spacing>
                Kandidater
            </Heading>
            <CandidatePicker
                candidate={candidates[0]}
                insight={insight}
                setInsight={setInsight}
            />
        </>
    );
};
