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

const insightMock: IInsight[] = [{
    id: 1,
    name: 'Skjermleser for blinde',
    description: 'Testy testy descriptioni',
    start: '02.02.2022',
    end: '23.04.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    }
},
{
    id: 1,
    name: 'Testing av ny dagpengeløsning',
    description: 'Testy testy descriptioni',
    start: '22.06.2022',
    end: '30.08.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    } 
},
{
    id: 1,
    name: 'Testing av ny foreldrepengeløsning',
    description: 'Testy testy descriptioni',
    start: '02.02.2022',
    end: '23.04.2022',
    criterias: [],
    consents: [],
    project: {
        id: 1,
        name: 'Veldig stor prosjekt',
        description: 'Desipt testu',
        members: [],
        start: '',
        end: ''
    } 
}];

export default function OngoingInsight(): ReactElement {

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
            {filterForOngoingInsightWork(insightMock).map((item, i) => {
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