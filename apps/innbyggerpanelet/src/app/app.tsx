import React from 'react'
import '@navikt/ds-css'
import CandidateProfile, { Candidate } from './containers/candidateProfile/CandidateProfile'

const candidate: Candidate = {
    name: 'Nord nordmann',
    age: 19,
    motherTounge: 'Norsk',
    education: 'higher',
    benefits: undefined,
    handicap: false,
    assistiveTechnology: 'Skjermleser',
    digitalSkills: 'average',
    employed: true,
    industry: 'Olje og gass'
}

export const App = () => {
    return (
        <CandidateProfile {...candidate}/>
    )
}

export default App
