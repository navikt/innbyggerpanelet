import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ICandidate, IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';

import style from './CreateInsight.module.scss';
import { mocks } from '../../utils/mocks';
import { useUserByCriterias } from '../../api/hooks/useUser';
import { createInsight } from '../../api/mutations/mutateInsight';
import { createCandidates } from '../../api/mutations/mutateCandidate';

const defaultInsight: IInsight = {
    id: 0,
    name: '',
    description: '',
    start: '',
    end: '',
    project: {
        id: 0,
        name: '',
        description: '',
        members: [],
        start: '',
        end: ''
    },
    criterias: [],
    consents: []
};

export const CreateInsight = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Look into using context when receipt container is to be made.
    const [insight, setInsight] = useState<IInsight>(defaultInsight);
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [posting, setPosting] = useState(false);

    // TODO: implement better handling of API response (isLoading/isError)
    const { users, isLoading, isError } = useUserByCriterias(insight.criterias);

    const handleSubmit = async () => {
        if (!id) throw new Error('This project does not exist.');

        setPosting(true);

        const payload = {
            ...insight,
            project: { ...insight.project, id: parseInt(id) }
        };

        const insightMutation = await createInsight(payload);

        if (!insightMutation.response || insightMutation.isError) throw new Error('Failed to post insight.');

        const configuredCandidates = candidates.map((c) => {
            return { ...c, insight: insightMutation.response };
        }) as ICandidate[];

        const candidatesMutation = await createCandidates(configuredCandidates);

        if (candidatesMutation.response) {
            navigate(`/prosjekt/${id}`);
        } else if (candidatesMutation.isError) {
            throw new Error('Failed to post candidates');
        }
    };

    return (
        <>
            <Panel>
                <Button onClick={handleSubmit} loading={posting}>
                    Inviter
                </Button>
                <Heading level={'1'} size="2xlarge" spacing>
                    Nytt innsiktsarbeid
                </Heading>
                <InsightConfiguration insight={insight} setInsight={setInsight} />
            </Panel>
            <Panel>
                <div className={style.candidatesHeader}>
                    <Heading level={'2'} size="xlarge" spacing>
                        Kandidater
                    </Heading>
                    <Label>Valgte kandidater: {users ? `${candidates.length}/${users.length}` : '0/0'}</Label>
                </div>
                <div>
                    {users
                        ? users.map((user, index) => {
                            return (
                                <CandidatePicker
                                    key={index}
                                    user={user}
                                    insight={insight}
                                    candidates={candidates}
                                    setCandidates={setCandidates}
                                />
                            );
                        })
                        : null}
                </div>
            </Panel>
        </>
    );
};
