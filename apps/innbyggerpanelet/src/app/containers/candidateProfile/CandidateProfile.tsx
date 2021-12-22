import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints'
import CandidateIcon from '../../components/candidateProfile/CandidateIcon'
import CandidateProperties from './CandidateProperties'

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
        <div>
            <div className='candidate-profile'>
                <div className='candidate-info'>
                    <CandidateIcon />
                    <Heading size="medium">{candidate.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
                <CandidateProperties />
            </div>
        </div>
    )
}