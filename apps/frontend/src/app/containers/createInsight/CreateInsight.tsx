import { ReactElement, useState } from 'react';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { Candidate, Insight } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

import style from './CreateInsight.module.scss';

// Temporary mock data
const candidates: Candidate[] = [
    {
        id: 1,
        name: 'Ola Nordmann',
        traits: [{ id: 12, name: 'Hello' }],
        age: 12,
        motherTounge: 'Norsk',
        education: 'Høyskole/Universitet',
        digitalSkills: 'Dårlig',
        employed: false
    },
    {
        id: 2,
        name: 'Kari Nordmann',
        traits: [{ id: 13, name: 'Hello' }],
        age: 19,
        motherTounge: 'Norsk',
        education: 'Videregående',
        digitalSkills: 'Bra',
        employed: false
    },
];

const defaultInsight: Insight = {
    name: '',
    insightTechnique: 'Intervju',
    description: '',
    starts: '',
    ends: '',
    candidates: [],
    traits: [],
    consents: [],
};

export const CreateInsight = (): ReactElement => {
    // TODO: Look into using context when receipt container is to be made.
    const [insight, setInsight] = useState<Insight>(defaultInsight);

    return (
        <Panel>
            <div className={style.wrapper}>
                <div className={style.configHeader}>
                    <Heading level={'1'} size="2xlarge" spacing>
                        Nytt innsiktsarbeid
                    </Heading>
                    <Button>INVITER</Button>
                </div>
                <InsightConfiguration
                    insight={insight}
                    setInsight={setInsight}
                />
                <div className={style.candidatesHeader}>
                    <Heading level={'2'} size="xlarge" spacing>
                        Kandidater
                    </Heading>
                    <Label>
                        Valgte kandidater: {insight.candidates?.length}/
                        {candidates.length}
                    </Label>
                </div>
                <div>
                    {candidates.map((candidate, index) => {
                        return (
                            <CandidatePicker
                                key={index}
                                candidate={candidate}
                                insight={insight}
                                setInsight={setInsight}
                            />
                        );
                    })}
                </div>
            </div>
        </Panel>
    );
};