import { Insight } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Checkbox, Heading, Label } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';

import style from './Project.module.scss';

interface IProps {
    insight: Insight;
}

export const ProjectInsightEntry = ({ insight }: IProps): ReactElement => {
    const [open, setOpen] = useState(false);

    const candidatesCompleted = insight.candidates.filter(
        (c) => c.insightCompleted
    ).length;

    return (
        <div className={style.wrapper}>
            <div className={style.header} onClick={() => setOpen(!open)}>
                <Heading size="large">{insight.name}</Heading>
                <BodyShort>00% relevansgradering</BodyShort>
                <BodyShort>
                    {candidatesCompleted}/{insight.candidates.length}{' '}
                    gjennomført
                </BodyShort>
            </div>
            {open ? (
                <div className={style.dropdown}>
                    <Label>Kriterier:</Label>
                    <ul>
                        {insight.traits.map((trait, index) => (
                            <li key={index}>{trait.name}</li>
                        ))}
                    </ul>
                    <Label>Samtykker:</Label>
                    <ul>
                        {insight.consents.map((consent, index) => (
                            <li key={index}>{consent.name}</li>
                        ))}
                    </ul>
                    <Label>Deltagere:</Label>
                    <ul className={style.entryCandidates}>
                        {insight.candidates.map((candidate, index) => (
                            <li key={index}>
                                <div>
                                    <BodyShort>{candidate.name}</BodyShort>
                                    <BodyShort>00% relevansgradering</BodyShort>
                                    <Checkbox
                                        hideLabel
                                        id="insightCompleted"
                                        checked={candidate.insightCompleted}>
                                        gjennomført
                                    </Checkbox>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
