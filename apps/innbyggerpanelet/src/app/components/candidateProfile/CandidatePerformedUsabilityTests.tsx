import React, { ReactElement, useState } from 'react'

export default function CandidatePerformedUsabilityTests(): ReactElement {
    const [performedUsabilityTestsList, setPerformedUsabilityTestsList] = useState<string[]>([
        'Intervju om pensjon',
        'Intervju om pensjon',
        'Intervju om pensjon',
        'Brukertest av nav.no',
        'Brukertestg av nav.no',
        'Brukertest av nav.no',
        'Spørreundersøkelse om AAP'
    ])

    return (
        <div className="candidates-performed-usability-tests-container">
            {performedUsabilityTestsList.map(
                (item, i) => <p key={i}>{performedUsabilityTestsList[i]}</p>
                )}
        </div>
    )
}