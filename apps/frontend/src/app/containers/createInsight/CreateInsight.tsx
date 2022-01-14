import { ReactElement, useState } from 'react';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

import style from './CreateInsight.module.scss';

// Temporary mock data
const candidates: IUser[] = [
    {
        id: 1,
        email: 'ola@example.com',
        phone: '12312123',
        latestUpdate: '2022-01-01',
        name: 'Ola Nordmann',
        criterias: [
            { id: 12, name: 'Mellom 18 og 25 år', exclusivitySlug: 'alder' },
        ],
    },
    {
        id: 2,
        email: 'kari@example.com',
        phone: '32132321',
        latestUpdate: '2022-01-02',
        name: 'Kari Nordmann',
        criterias: [
            { id: 13, name: 'Mellom 26 og 35 år', exclusivitySlug: 'alder ' },
        ],
    },
];

const defaultInsight: IInsight = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    candidates: [],
    criterias: [],
    consents: [],
};

export const CreateInsight = (): ReactElement => {
    // TODO: Look into using context when receipt container is to be made.
    const [insight, setInsight] = useState<IInsight>(defaultInsight);

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
