import {
    ICandidate,
    IInsight,
    ICriteria,
    IUser,
} from '@innbyggerpanelet/api-interfaces';
import { ReactElement } from 'react';
import { Label, Detail } from '@navikt/ds-react';

import style from './CandidatePicker.module.scss';

interface IProps {
    candidate: IUser;
    insight: IInsight;
    setInsight: (insight: IInsight) => void;
}

export const CandidatePicker = ({
    candidate,
    insight,
    setInsight,
}: IProps): ReactElement => {
    const isSelected = (): boolean => {
        const exists = insight.candidates.find(
            (c) => c.user.id === candidate.id
        );
        return exists !== undefined;
    };

    const getRelevantcriterias = (): ICriteria[] => {
        const criteriaIDs = candidate.criterias.map((criteria) => {
            return criteria.id;
        });

        const relevantcriterias = insight.criterias.filter((criteria) =>
            criteriaIDs.includes(criteria.id)
        );

        return relevantcriterias;
    };

    const getRelevancePercentage = (): number => {
        return (
            ((getRelevantcriterias().length / insight.criterias.length) * 100) |
            0
        );
    };

    const criteriaIsRelevant = (criteria: ICriteria): boolean => {
        const relevantcriterias = getRelevantcriterias();
        return relevantcriterias.includes(criteria);
    };

    const toggleCandidate = () => {
        const exists = isSelected();
        const newInsight = { ...insight };

        if (exists) {
            const newCandidates = [...newInsight.candidates];
            newInsight.candidates = newCandidates.filter(
                (c) => c.user.id !== candidate.id
            );
        } else {
            newInsight.candidates.push({
                user: candidate,
                insight,
                relevancyGrading: getRelevancePercentage(),
            });
        }

        setInsight(newInsight);
    };

    return (
        <div
            className={`${style.wrapper} ${isSelected() ? style.selected : ''}`}
            onClick={toggleCandidate}>
            <div className={style.header}>
                <Label size="medium" className={style.candidateName}>
                    {candidate.name}
                </Label>
                <div className={style.relevanceGrading}>
                    <div className={style.relevanceGradingBar}>
                        <div
                            style={{
                                width: `${getRelevancePercentage()}%`,
                            }}></div>
                    </div>
                    <Detail>{`${getRelevancePercentage()}%`}</Detail>
                </div>
            </div>
            <div className={style.criterias}>
                {insight.criterias.map((criteria, index) => {
                    return (
                        <Detail
                            key={index}
                            className={`${
                                criteriaIsRelevant(criteria)
                                    ? style.relevantcriteria
                                    : style.irrelevantcriteria
                            }`}>
                            {criteria.name}
                        </Detail>
                    );
                })}
            </div>
        </div>
    );
};
