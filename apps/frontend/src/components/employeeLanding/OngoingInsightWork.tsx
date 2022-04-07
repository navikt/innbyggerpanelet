import { Heading, LinkPanel } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './OngoingInsightWork.module.scss';

export interface IInsightWorkLink {
    path: string
    title: string
    start: string
    end: string
}

const insightWorkLinks: IInsightWorkLink[] = [{
    path: '#/1',
    title: 'Arbeid',
    start: '02.02.2022',
    end: '23.04.2022'
},
{
    path: '#/1',
    title: 'Arbeid',
    start: '02.02.2022',
    end: '23.04.2022'
}];

export default function OngoingInsightWork(): ReactElement {
    return (
        <div className={style.ongoingInsightWorkContainer}>
            <Heading size="xlarge">Pågående innsiktsarbeid</Heading>
            {insightWorkLinks.map((item, i) => {
                return (
                    <LinkPanel key={i} href={item.path}>
                        <LinkPanel.Title>{item.title}</LinkPanel.Title>
                        <LinkPanel.Description>{`${item.start} - ${item.end}`}</LinkPanel.Description>
                    </LinkPanel>
                );
            })}
        </div>
    );
}