import { Insight } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Heading, Label } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';

import style from './ProjectInsightEntry.module.scss';

interface IProps {
    insight: Insight;
}

export const ProjectInsightEntry = ({ insight }: IProps): ReactElement => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.wrapper}>
            <div className={style.header} onClick={() => setOpen(!open)}>
                <Heading size="large">{insight.name}</Heading>
                <BodyShort>{insight.candidates.length} relevans</BodyShort>
                <BodyShort>0/{insight.candidates.length} gjennomført</BodyShort>
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
                    <ul>
                        {insight.candidates.map((candidate, index) => (
                            <li key={index}>{candidate.name}</li>
                        ))}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};
