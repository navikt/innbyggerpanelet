import { EnumCandidateStatus, ICandidate, ICitizen, ICriteria, IInsight } from '@innbyggerpanelet/api-interfaces';
import { Detail, Label } from '@navikt/ds-react';
import { ReactElement, useEffect } from 'react';
import { ProgressBar } from '../../common/components/progressBar';
import style from './components.module.scss';

interface IProps {
    index: number;
    citizen: ICitizen;
    insight: IInsight;
    candidates: ICandidate[];
    setCandidates: (candidates: ICandidate[]) => void;
}

export const CandidatePicker = ({ index, citizen, insight, candidates, setCandidates }: IProps): ReactElement => {
    // Does citizen already exist in selected candidates
    const isSelected = (): boolean => {
        const exists = candidates.find((c) => c.citizen.id === citizen.id);
        return exists !== undefined;
    };

    // Which criteria required by the insight work does the citizen posess
    const getRelevantCriterias = (): ICriteria[] => {
        const criteriaIDs = citizen.criterias.map((criteria) => {
            return criteria.id;
        });

        const relevantCriterias = insight.criterias.filter((criteria) => criteriaIDs.includes(criteria.id));
        return relevantCriterias;
    };

    const getRelevancePercentage = (): number => {
        const results = getRelevantCriterias().length / insight.criterias.length;
        return results > 0 ? results : 0;
    };

    // Does the criteria exist in the insight
    const criteriaIsRelevant = (criteria: ICriteria): boolean => {
        const relevantCriterias = getRelevantCriterias();
        return relevantCriterias.includes(criteria);
    };

    // Add or remove citizen from insight candidate list
    const toggleCandidate = () => {
        const exists = isSelected();
        const newCandidates = [...candidates];

        if (exists) {
            setCandidates(newCandidates.filter((c) => c.citizen.id !== citizen.id));
        } else {
            setCandidates([
                ...newCandidates,
                {
                    citizen,
                    insight,
                    hasConsented: false,
                    relevancyGrading: getRelevancePercentage(),
                    status: EnumCandidateStatus.Pending
                }
            ]);
        }
    };

    useEffect(() => {
        // Reset candidates on changes in criterias
        setCandidates([]);
    }, [insight.criterias]);

    return (
        <div className={`${style.candidateWrapper} ${isSelected() ? style.selected : ''}`} onClick={toggleCandidate}>
            <div className={style.header}>
                <Label size="medium" className={style.candidateName}>
                    Kandidat {index + 1}
                </Label>
                <ProgressBar label="Relevansgradering" progress={getRelevancePercentage()} />
            </div>
            <div className={`${style.criterias} ${insight.criterias.length ? '' : style.hidden}`}>
                {insight.criterias.map((criteria, index) => {
                    return (
                        <Detail
                            key={index}
                            className={`${
                                criteriaIsRelevant(criteria) ? style.relevantcriteria : style.irrelevantcriteria
                            }`}
                        >
                            {criteria.name}
                        </Detail>
                    );
                })}
            </div>
        </div>
    );
};
