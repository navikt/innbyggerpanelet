import { Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import PropertieValueField from '../../components/misc/propertieValueField/PropertieValueField'
import { Candidate } from './CandidateProfile'

import style from './CandidateProperties.module.scss'

export default function CandidateProperties(candidate: Candidate): ReactElement {
    return (
        <div>
            <div className={style.candidateProperties}>
                <Heading size="large">Egenskaper</Heading>
                <PropertieValueField 
                    propertie="Alder"
                    value={candidate.age.toString()}    
                />
                <PropertieValueField 
                    propertie='Morsmål'
                    value={candidate.motherTounge}
                />
                <PropertieValueField 
                    propertie='Utdanning'
                    value={candidate.education}
                />
                <PropertieValueField 
                    propertie='Ytelser'
                    value={candidate.benefits}
                />
                <PropertieValueField 
                    propertie='Funksjonsvariasjon'
                    value={candidate.handicap}
                />
                <PropertieValueField 
                    propertie='Hjelpemiddelteknologi'
                    value={candidate.assistiveTechnology}
                />
                <PropertieValueField 
                    propertie='Digitale ferdigheter'
                    value={candidate.digitalSkills}
                />
                <PropertieValueField 
                    propertie='Bransje'
                    value={candidate.industry}
                />
            </div>
        </div>
    )
}