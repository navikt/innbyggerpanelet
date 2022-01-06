import { Insight } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import PropertieValueField from '../../components/misc/propertieValueField/PropertieValueField';

import style from './CandidatePerformedInsight.module.scss';

export default function CandidatePerfomedInsight(insightWorks: Insight[]): ReactElement {
    return (
        <div>
            <div className={style.candidatePerfomedInsight}>
                <Heading size='large'>Tidligere innsiktsarbeid</Heading>
                {Object.keys(insightWorks).map((item, i) => <PropertieValueField key={i} propertie={insightWorks[i].name} value={insightWorks[i].insightTechnique}/>)}
            </div>
        </div>
    );
}