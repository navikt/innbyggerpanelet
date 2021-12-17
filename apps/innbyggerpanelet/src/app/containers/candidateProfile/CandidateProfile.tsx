import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints'
import CandidateIcon from '../../components/candidateProfile/CandidateIcon'

export interface Candidate {
    name: string
    age: number
    motherTounge: string
    education: 'elementary' | 'middle-school' | 'elementary' | 'higher'
    benefits?: string
    handicap: boolean | string
    assistiveTechnology: boolean | string
    digitalSkills: 'bad' | 'average' | 'good'
    employed: boolean
    industry?: string
}

export default function CandidateProfile(candidate: Candidate): ReactElement {
    return (
        <div className='candidate-profile'>
            <CandidateIcon />
            <Heading size="large">{candidate.name}</Heading>
            <CandidateExperiencePoints />
        </div>
    )
}