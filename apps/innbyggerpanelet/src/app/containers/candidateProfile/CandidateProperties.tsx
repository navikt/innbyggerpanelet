import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

export default function CandidateProperties(): ReactElement {
    return (
        <div>
            <div className='candidate-properties'>
                <Heading size="large">Egenskaper</Heading>
            </div>
        </div>
    )
}