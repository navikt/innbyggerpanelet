import React from 'react'
import '@navikt/ds-css'
import CandidateProfile, { Candidate } from './containers/candidateProfile/CandidateProfile'
import { InsigthWork } from './containers/candidateProfile/CandidatePerformedInsightWork'

const candidate: Candidate = {
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
}

const candidatePerformedInsightWork: InsigthWork[] = [
    {
        name: 'Arbeidsavklaringspenger',
        insightTechnique: 'Intervju'
    },
    {
        name: 'Dagpenger',
        insightTechnique: 'Lydopptak'
    }
]

export const App = () => {
    return (
        <CandidateProfile candidate={candidate} candidatePerformedInsightWork={candidatePerformedInsightWork}/>
    )
}

export default App
