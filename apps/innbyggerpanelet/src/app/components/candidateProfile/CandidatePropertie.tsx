import { Heading } from '@navikt/ds-react'
import React, { ReactElement, useEffect, useState } from 'react'

export default function CandidatePropertie(
    {
        propertie,
        value
    } : {
        propertie: string
        value?: string
    }
): ReactElement {
    const [propertieValue, setPropertieValue] = useState<string | undefined>(value)

    if (propertieValue === undefined || propertieValue === '') {
        setPropertieValue('-')
    }

    return(
        <div className="candidate-propertie">
            <Heading size="small">{propertie}</Heading>
            <p>{propertieValue}</p>
        </div>
    )
}