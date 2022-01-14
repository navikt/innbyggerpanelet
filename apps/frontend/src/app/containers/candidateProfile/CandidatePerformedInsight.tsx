import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertieValueField';

import style from './CandidatePerformedInsight.module.scss';

export default function CandidatePerfomedInsight({ insight } : { insight: IInsight[] }): ReactElement {
    return (
        <div>
            <div className={style.candidatePerfomedInsight}>
                <Heading size='large'>Tidligere innsiktsarbeid</Heading>
                {insight.map((item, i) => <PropertyValueField key={i} property={insight[i].name} value={insight[i].insightTechnique}/>)}
            </div>
        </div>
    );
}