import { Candidate, Trait } from '@innbyggerpanelet/api-interfaces';
import { FC } from 'react';
import { Label, Detail } from '@navikt/ds-react';

import style from './CandidatePicker.module.scss';

interface IProps {
    candidate: Candidate;
    relevantTraits: Trait[];
}

export const CandidatePicker: FC<IProps> = ({ candidate, relevantTraits }) => {
    return (
        <div className={style.wrapper}>
            <div className={style.header}>
                <Label size="medium" className={style.candidateName}>
                    {candidate.name}
                </Label>
                <div className={style.relevanceGrading}>
                    <div className={style.relevanceGradingBar}>
                        <div style={{ width: `${50}%` }}></div>
                    </div>{' '}
                    <Detail>{`${50}%`}</Detail>
                </div>
            </div>
            <div className={style.traits}>
                {relevantTraits.map((trait, index) => {
                    return <Detail key={index}>{trait.name}</Detail>;
                })}
            </div>
        </div>
    );
};
