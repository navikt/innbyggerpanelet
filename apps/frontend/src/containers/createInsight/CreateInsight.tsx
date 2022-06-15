import { ICandidate, IInsight } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { sendSms } from '../../api/hooks/useSms';
import { useUserByCriterias } from '../../api/hooks/useUser';
import { createCandidates } from '../../api/mutations/mutateCandidate';
import { createInsight } from '../../api/mutations/mutateInsight';
import CandidatePicker from '../../components/candidatePicker';
import InsightConfiguration from '../../components/insightConfiguration';
import { APIHandler } from '../../components/misc/apiHandler';
import ErrorList from '../../components/misc/validation/ErrorList';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import style from './CreateInsight.module.scss';

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
    const [insightValidationErrors, setInsightValidationErrors] = useFormatValidationErrors();

    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [candidateValidationErrors, setCandidateValidationErrors] = useFormatValidationErrors();

    const { users, loading, error } = useUserByCriterias(insight.criterias);

    const handleSubmit = async () => {
        if (!id) throw new Error('This project does not exist.');

        const payload = {
            ...insight,
            project: { ...insight.project, id: parseInt(id) }
        };

        const insightMutation = await createInsight(payload);
        if (insightMutation.error) throw new Error('Failed to post insight.');
        if (insightMutation.validationErrors) return setInsightValidationErrors(insightMutation.validationErrors);

        const configuredCandidates = candidates.map((c) => {
            return { ...c, insight: insightMutation.response };
        }) as ICandidate[];

        const candidateMutation = await createCandidates(configuredCandidates);
        if (candidateMutation.error) throw new Error('Failed to post candidates');
        if (candidateMutation.validationErrors) return setCandidateValidationErrors(candidateMutation.validationErrors);

        if (insightMutation.response && candidateMutation.response) navigate(`/prosjekt/${id}`);
        
        configuredCandidates.forEach(async (candidate) => {
            if (candidate.user.birthNumber !== undefined) {
                await sendSms({ 
                    birthNumber: candidate.user.birthNumber,
                    message: 'Du har blitt invitert til innsiktsarbeid. Logg deg inn på innbyggerpanelet for å se mer'
                });
            }
        });
    };

    return (
        <>
            <Panel>
                <Button onClick={handleSubmit}>Opprett</Button>
                <Heading level={'1'} size="2xlarge" spacing>
                    Nytt innsiktsarbeid
                </Heading>
                <InsightConfiguration
                    insight={insight}
                    setInsight={setInsight}
                    validationErrors={insightValidationErrors}
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
                                index={index}
                                insight={insight}
                                candidates={candidates}
                                setCandidates={setCandidates}
                            />
                        );
                    }) || <APIHandler error={error} loading={loading} />}
                    {candidateValidationErrors.candidates && (
                        <ErrorList errorMessages={[...candidateValidationErrors.candidates]} />
                    )}
                </div>
            </Panel>
        </>
    );
};
