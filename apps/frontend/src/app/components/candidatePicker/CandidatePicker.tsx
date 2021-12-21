import { Candidate, Trait } from '@innbyggerpanelet/api-interfaces';
import { FC } from 'react';
import { Label } from '@navikt/ds-react';

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
                <div className={style.relevanceGradingBar}>
                    <div style={{ width: `${50}%` }}></div>
                </div>
            </div>
            <div className={style.traits}>
                {relevantTraits.map((trait, index) => {
                    return <p key={index}>{trait.name}</p>;
                })}
            </div>
        </div>
    );
};
