import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertieValueField';
import { ICandidate } from '@innbyggerpanelet/api-interfaces';

import style from './CandidateProperties.module.scss';

export default function CandidateProperties(candidate: ICandidate): ReactElement {
    return (
        <div>
            <div className={style.candidateProperties}>
                <Heading size="large">Egenskaper</Heading>
                <PropertyValueField 
                    property="Alder"
                    value={candidate.age.toString()}    
                />
                <PropertyValueField 
                    property='Morsmål'
                    value={candidate.motherTounge}
                />
                <PropertyValueField 
                    property='Utdanning'
                    value={candidate.education}
                />
                <PropertyValueField 
                    property='Ytelser'
                    value={candidate.benefits}
                />
                <PropertyValueField 
                    property='Funksjonsvariasjon'
                    value={candidate.handicap}
                />
                <PropertyValueField 
                    property='Hjelpemiddelteknologi'
                    value={candidate.assistiveTechnology}
                />
                <PropertyValueField 
                    property='Digitale ferdigheter'
                    value={candidate.digitalSkills}
                />
                <PropertyValueField 
                    property='Bransje'
                    value={candidate.industry}
                />
            </div>
        </div>
    );
}