import { ReactElement, useState } from 'react';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ICandidate, IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

import style from './CreateInsight.module.scss';
import { mocks } from '../../utils/mocks';

const defaultInsight: IInsight = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    project: {
        id: 1,
        name: 'test',
        description: 'heisann',
        members: [],
        start: 'now',
        end: 'sometime',
    },
    criterias: [],
    consents: [],
};

export const CreateInsight = (): ReactElement => {
    // TODO: Look into using context when receipt container is to be made.
    const [insight, setInsight] = useState<IInsight>(defaultInsight);
    const [candidates, setCandidates] = useState<ICandidate[]>([]);

    const [users, setUsers] = useState<IUser[]>(mocks.allUsers);

    return (
        <>
            <Panel>
                <Button>INVITER</Button>
                <Heading level={'1'} size="2xlarge" spacing>
                    Nytt innsiktsarbeid
                </Heading>
                <InsightConfiguration
                    insight={insight}
                    setInsight={setInsight}
                />
            </Panel>
            <Panel>
                <div className={style.candidatesHeader}>
                    <Heading level={'2'} size="xlarge" spacing>
                        Kandidater
                    </Heading>
                    <Label>
                        Valgte kandidater: {candidates.length}/{users.length}
                    </Label>
                </div>
                <div>
                    {users.map((user, index) => {
                        return (
                            <CandidatePicker
                                key={index}
                                user={user}
                                insight={insight}
                                candidates={candidates}
                                setCandidates={setCandidates}
                            />
                        );
                    })}
                </div>
            </Panel>
        </>
    );
};
