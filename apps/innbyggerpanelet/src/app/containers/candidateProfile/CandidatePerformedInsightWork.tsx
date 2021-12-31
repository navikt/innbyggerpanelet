import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PropertieValueField from '../../components/misc/propertieValueField/PropertieValueField'

export interface InsigthWork {
    name: string
    insightTechnique: 'Intervju' | 'Lydopptak' | 'Videoopptak'
}

export default function CandidatePerfomedInsightWork(insightWorks: InsigthWork[]): ReactElement {
    return (
        <div>
            <div className='candidate-performed-insigth-work'>
                <Heading size='large'>Tidligere innsiktsarbeid</Heading>
                {Object.keys(insightWorks).map((item, i) => <PropertieValueField key={i} propertie={insightWorks[i].name} value={insightWorks[i].insightTechnique}/>)}
            </div>
        </div>
    )
}