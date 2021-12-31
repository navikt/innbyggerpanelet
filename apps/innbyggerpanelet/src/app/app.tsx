import React, { useState } from 'react'
import '@navikt/ds-css'
import CandidateProfile, { Candidate } from './containers/candidateProfile/CandidateProfile'
import { InsigthWork } from './containers/candidateProfile/CandidatePerformedInsightWork'


export const App = () => {
    const [candidate, setCandidate] = useState<Candidate>({
        name: 'Nord nordmann',
        age: 19,
        motherTounge: 'Norsk',
        education: 'Høyskole/Universitet',
        benefits: undefined,
        handicap: '',
        assistiveTechnology: 'Skjermleser',
        digitalSkills: 'Gjennomsnittelig',
        employed: true,
        industry: 'Olje og gass'
    })

    const [performedInsightWork, setPerformedInsightWork] = useState<InsigthWork[]>([
        {
            name: 'Arbeidsavklaringspenger',
            insightTechnique: 'Intervju'
        },
        {
            name: 'Dagpenger',
            insightTechnique: 'Lydopptak'
        }
    ])

    return (
        <CandidateProfile candidate={candidate} candidatePerformedInsightWork={performedInsightWork}/>
    )
}

export default App
