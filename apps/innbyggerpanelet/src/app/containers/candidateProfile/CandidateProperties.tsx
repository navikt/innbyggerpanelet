import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import CandidatePropertie from '../../components/candidateProfile/CandidatePropertie'
import { Candidate } from './CandidateProfile'

export default function CandidateProperties(candidate: Candidate): ReactElement {
    return (
        <div>
            <div className='candidate-properties'>
                <Heading size="large">Egenskaper</Heading>
                <CandidatePropertie 
                    propertie="Alder"
                    value={candidate.age.toString()}    
                />
                <CandidatePropertie 
                    propertie='Morsmål'
                    value={candidate.motherTounge}
                />
                <CandidatePropertie 
                    propertie='Utdanning'
                    value={candidate.education}
                />
                <CandidatePropertie 
                    propertie='Ytelser'
                    value={candidate.benefits}
                />
                <CandidatePropertie 
                    propertie='Funksjonsvariasjon'
                    value={candidate.handicap}
                />
                <CandidatePropertie 
                    propertie='Hjelpemiddelteknologi'
                    value={candidate.assistiveTechnology}
                />
                <CandidatePropertie 
                    propertie='Digitale ferdigheter'
                    value={candidate.digitalSkills}
                />
                <CandidatePropertie 
                    propertie='Bransje'
                    value={candidate.industry}
                />
            </div>
        </div>
    )
}