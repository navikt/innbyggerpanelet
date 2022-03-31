import { ReactElement, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ICandidate, IInsight } from '@innbyggerpanelet/api-interfaces';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';
import { useUserByCriterias } from '../../api/hooks/useUser';
import { createInsight } from '../../api/mutations/mutateInsight';
import { createCandidates } from '../../api/mutations/mutateCandidate';
import { APIHandler } from '../../components/misc/apiHandler';
import style from './CreateInsight.module.scss';
import { validateInsight } from '../../validation/insight';
import ErrorList from '../../components/misc/validation/ErrorList';
import { IMutation } from '../../api/mutations/IMutation';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';

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

    const { users, loading, error } = useUserByCriterias(insight.criterias);

    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleSubmit = async () => {
        if (!id) throw new Error('This project does not exist.');


        const payload = {
            ...insight,
            project: { ...insight.project, id: parseInt(id) }
        };

        let insightMutation: IMutation<IInsight> | undefined = undefined;

        if (validateInsight(insight, candidates).isValid) {
            setPosting(true);
            
            insightMutation = await createInsight(payload);
            
            if (!insightMutation.response || insightMutation.isError) {
                throw new Error('Failed to post insight.');   
            }
            
            const configuredCandidates = candidates.map((c) => {
                return { ...c, insight: insightMutation?.response };
            }) as ICandidate[];
        
        
            const candidatesMutation = await createCandidates(configuredCandidates);

            if (candidatesMutation.response) {
                errorMessageDispatch.clearErrorMessages();
                navigate(`/prosjekt/${id}`);
            } else if (candidatesMutation.isError) {
                throw new Error('Failed to post candidates');
            }
        } else {
            errorMessageDispatch.setErrorMessages(validateInsight(insight, candidates).errorMesseges);
        }

    };

    return (
        <>
            <Panel>
                <Button onClick={handleSubmit} loading={posting}>
                    Opprett
                </Button>
                <Heading level={'1'} size="2xlarge" spacing>
                    Nytt innsiktsarbeid
                </Heading>
                <InsightConfiguration 
                    insight={insight} 
                    setInsight={setInsight} 
                    errorMessages={errorMessages}
                />
            </Panel>
            <Panel>
                <div className={style.candidatesHeader}>
                    <Heading level={'2'} size="xlarge" spacing>
                        Kandidater
                    </Heading>
                    <Label>Valgte kandidater: {users ? `${candidates.length}/${users.length}` : '0/0'}</Label>
                </div>
                <div>
                    {users?.map((user, index) => {
                        return (
                            <CandidatePicker
                                key={index}
                                user={user}
                                insight={insight}
                                candidates={candidates}
                                setCandidates={setCandidates}
                            />
                        );
                    }) || <APIHandler error={error} loading={loading} />}
                    {errorMessages.candidatesErrorMsg && (
                        <ErrorList errorMessages={[errorMessages.candidatesErrorMsg]}/>
                    )}
                </div>
            </Panel>
        </>
    );
};
