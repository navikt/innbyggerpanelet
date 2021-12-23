import { Candidate, Insight, Trait } from '@innbyggerpanelet/api-interfaces';
import { FC } from 'react';
import { Label, Detail } from '@navikt/ds-react';

import style from './CandidatePicker.module.scss';
import { isUndefined } from 'util';

interface IProps {
    candidate: Candidate;
    insight: Insight;
    setInsight: (insight: Insight) => void;
}

export const CandidatePicker: FC<IProps> = ({
    candidate,
    insight,
    setInsight,
}) => {
    const isSelected = (): boolean => {
        const exists = insight.candidates.find((c) => c.id === candidate.id);
        return exists !== undefined;
    };

    const getRelevantTraits = (): Trait[] => {
        const traitIDs = candidate.traits.map((trait) => {
            return trait.id;
        });

        const relevantTraits = insight.traits.filter((trait) =>
            traitIDs.includes(trait.id)
        );

        return relevantTraits;
    };

    const getRelevancePercentage = (): number => {
        return ((getRelevantTraits().length / insight.traits.length) * 100) | 0;
    };

    const traitIsRelevant = (trait: Trait): boolean => {
        const relevantTraits = getRelevantTraits();
        return relevantTraits.includes(trait);
    };

    const toggleCandidate = () => {
        const exists = isSelected();
        const newInsight = { ...insight };

        if (exists) {
            const newCandidates = [...newInsight.candidates];
            newInsight.candidates = newCandidates.filter(
                (c) => c.id !== candidate.id
            );
        } else {
            newInsight.candidates.push(candidate);
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
            <div className={style.traits}>
                {insight.traits.map((trait, index) => {
                    return (
                        <Detail
                            key={index}
                            className={`${
                                traitIsRelevant(trait)
                                    ? style.relevantTrait
                                    : style.irrelevantTrait
                            }`}>
                            {trait.name}
                        </Detail>
                    );
                })}
            </div>
        </div>
    );
};
