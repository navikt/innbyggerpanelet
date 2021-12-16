import { Heading } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'

export default function CandidateProperties(): ReactElement {
    const [candidateProperties, setCandidateProperties] = useState<string[]>([
        'Aldersgruppe 40-50 år',
        'Arbeidsledig',
        'Bruker hjelpemiddelteknologi',
        'Hei',
        'hei', 
        'hei'
    ])

    return (
        <div className="candidates-properties-container">
            {candidateProperties.map(
                (item, i) => <p key={i}>{candidateProperties[i]}</p>
                )}
        </div>
    )
}