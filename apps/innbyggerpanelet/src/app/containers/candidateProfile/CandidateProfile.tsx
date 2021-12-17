import React, { ReactElement } from 'react'

interface Candidate {
    name: string
    age: number
    motherTounge: string
    education: 'elementary' | 'middle-school' | 'elementary' | 'higher'
    benefits: string
    handicap: boolean | string
    assistiveTechnology: boolean | string
    digitalSkills: 'bad' | 'average' | 'good'
    employed: boolean
    industry: string | null
}

export default function CandidateProfile(): ReactElement {
    return (
        <div>{'hei'}</div>
    )
}