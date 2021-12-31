import React, { useState } from 'react'
import '@navikt/ds-css'
import CandidateProfile from './containers/candidateProfile/CandidateProfile'
import { Candidate, Insight } from '@innbyggerpanelet/api-interfaces'


export const App = () => {
    const [candidate, setCandidate] = useState<Candidate>({
        id: 1,
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

    const [performedInsightWork, setPerformedInsightWork] = useState<Insight[]>([
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
