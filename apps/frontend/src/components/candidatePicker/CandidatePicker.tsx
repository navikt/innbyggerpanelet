import { EnumCandidateStatus, ICandidate, ICriteria, IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import { Detail, Label } from '@navikt/ds-react';
import { ReactElement, useEffect } from 'react';
import { ProgressBar } from '../misc/progressBar';
import style from './CandidatePicker.module.scss';

interface IProps {
    index: number;
    user: IUser;
    insight: IInsight;
    candidates: ICandidate[];
    setCandidates: (candidates: ICandidate[]) => void;
}

export const CandidatePicker = ({ index, user, insight, candidates, setCandidates }: IProps): ReactElement => {
    // Does user already exist in selected candidates
    const isSelected = (): boolean => {
        const exists = candidates.find((c) => c.user.id === user.id);
        return exists !== undefined;
    };

    // Which criteria required by the insight work does the user posess
    const getRelevantCriterias = (): ICriteria[] => {
        const criteriaIDs = user.criterias.map((criteria) => {
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

    // Add or remove user from insight candidate list
    const toggleCandidate = () => {
        const exists = isSelected();
        const newCandidates = [...candidates];

        if (exists) {
            setCandidates(newCandidates.filter((c) => c.user.id !== user.id));
        } else {
            setCandidates([
                ...newCandidates,
                {
                    user,
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
        <div className={`${style.wrapper} ${isSelected() ? style.selected : ''}`} onClick={toggleCandidate}>
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
