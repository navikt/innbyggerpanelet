import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './ConsentTextPanel.module.scss';

export function ConsentTextPanel({
    header,
    paragraphs
}: {
    header: string
    paragraphs: string[]
}): ReactElement {
    return (
        <Panel className={style.consentTextContainer}>
            <Heading size="small">{header}</Heading>
            {paragraphs.map((p, i) => {
                return <BodyLong key={i}>{p}</BodyLong>;
            })}
        </Panel>
    );
}