import React from 'react'
import '@navikt/ds-css'
import CandidateProfile, { Candidate } from './containers/candidateProfile/CandidateProfile'

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

export const App = () => {
    return (
        <CandidateProfile {...candidate}/>
    )
}

export default App
