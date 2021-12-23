import { Heading } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints'
import CandidateIcon from '../../components/candidateProfile/CandidateIcon'
import CandidatePerfomedInsightWork, { InsigthWork } from './CandidatePerformedInsightWork'
import CandidateProperties from './CandidateProperties'

export interface Candidate {
    name: string
    age: number
    motherTounge: string
    education: 'Barneskole' | 'Ungdomsskole' | 'Videregående' | 'Høyskole/Universitet' | 'Ingen'
    benefits?: string
    handicap?: string
    assistiveTechnology?: string
    digitalSkills: 'Dårlig' | 'Gjennomsnittelig' | 'Bra'
    employed: boolean
    industry?: string
}

// TODO: Explore the oppertunity to use useContext for a candidate, as 
// there is now quite alot of prop drilling
export default function CandidateProfile({
    candidate,
    candidatePerformedInsightWork
}: {
    candidate: Candidate
    candidatePerformedInsightWork: InsigthWork[]
}): ReactElement {
    return (
        <div>
            <div className='candidate-profile'>
                <div className='candidate-info'>
                    <CandidateIcon />
                    <Heading size="medium">{candidate.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
                <CandidateProperties {...candidate}/>
                <CandidatePerfomedInsightWork {...candidatePerformedInsightWork}/>
            </div>
        </div>
    )
}