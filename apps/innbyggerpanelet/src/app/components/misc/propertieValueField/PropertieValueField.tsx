import { Heading } from '@navikt/ds-react'
import React, { ReactElement, useEffect, useState } from 'react'

export default function PropertieValueField(
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
        <div className="propertie-value-field">
            <Heading size="small">{propertie}</Heading>
            <p>{propertieValue}</p>
        </div>
    )
}