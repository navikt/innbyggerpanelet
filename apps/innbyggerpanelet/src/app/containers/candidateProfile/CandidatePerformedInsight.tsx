import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PropertieValueField from '../../components/misc/propertieValueField/PropertieValueField'

import style from './CandidatePerformedInsight.module.scss'

export interface InsigthWork {
    name: string
    insightTechnique: 'Intervju' | 'Lydopptak' | 'Videoopptak'
}

export default function CandidatePerfomedInsight(insightWorks: InsigthWork[]): ReactElement {
    return (
        <div>
            <div className={style.candidatePerfomedInsight}>
                <Heading size='large'>Tidligere innsiktsarbeid</Heading>
                {Object.keys(insightWorks).map((item, i) => <PropertieValueField key={i} propertie={insightWorks[i].name} value={insightWorks[i].insightTechnique}/>)}
            </div>
        </div>
    )
}