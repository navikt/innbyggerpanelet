import { ICandidate, IInsight } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Label, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCitizenByCriterias } from '../../common/api/hooks';
import { createCandidates, createInsight } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import ErrorList from '../../common/components/validation/ErrorList';
import { useFormatValidationErrors } from '../../common/hooks';
import { CandidatePicker } from '../components';
import { EmployeeInsightConfiguration } from '../containers';
import style from './EmployeeInsightCreationPage.module.scss';

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

export const EmployeeInsightCreationPage = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();

    // TODO: Look into using context when receipt container is to be made.
    const [insight, setInsight] = useState<IInsight>(defaultInsight);
    const [insightValidationErrors, setInsightValidationErrors] = useFormatValidationErrors();

    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [candidateValidationErrors, setCandidateValidationErrors] = useFormatValidationErrors();

    const { citizens, loading, error } = useCitizenByCriterias(insight.criterias);

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
    };

    return (
        <>
            <Panel>
                <Button onClick={handleSubmit}>Opprett</Button>
                <Heading level={'1'} size="2xlarge" spacing>
                    Nytt innsiktsarbeid
                </Heading>
                <EmployeeInsightConfiguration
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
                    <Label>Valgte kandidater: {citizens ? `${candidates.length}/${citizens.length}` : '0/0'}</Label>
                </div>
                <div>
                    {citizens?.map((citizen, index) => {
                        return (
                            <CandidatePicker
                                key={index}
                                citizen={citizen}
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
