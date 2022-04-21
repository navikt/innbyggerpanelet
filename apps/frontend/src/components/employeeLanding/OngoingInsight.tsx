import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { Heading, LinkPanel } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './OngoingInsight.module.scss';
import { isWithinInterval, parse } from 'date-fns';

export interface IInsightWorkLink {
    path: string
    title: string
    start: string
    end: string
}

export default function OngoingInsight({ userInsight }: { userInsight: IInsight[]}): ReactElement {

    const filterForOngoingInsightWork = (insights: IInsight[]): IInsightWorkLink[] => {
        const filtered: IInsightWorkLink[] = [];

        for (const insight of insights) {
            if (isWithinInterval(
                new Date(),
                { 
                    start: parse(insight.start, 'dd.MM.yyyy', new Date()), 
                    end: parse(insight.end, 'dd.MM.yyyy', new Date())}
            )) {
                filtered.push({
                    path: '#1',
                    title: insight.name,
                    start: insight.start,
                    end: insight.end
                });
            }
        }

        return filtered;
    };

    return (
        <div className={style.ongoingInsightWorkContainer}>
            <Heading size="xlarge">Pågående innsiktsarbeid</Heading>
            {filterForOngoingInsightWork(userInsight).map((item, i) => {
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