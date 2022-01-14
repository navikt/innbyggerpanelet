import { Heading } from '@navikt/ds-react';
import React, { ReactElement, useState } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import { People } from '@navikt/ds-icons';
import CandidatePerfomedInsight from './CandidatePerformedInsight';
import CandidateProperties from './CandidateProperties';
import { ICandidate, IInsight } from '@innbyggerpanelet/api-interfaces';
import style from './CandidateProfile.module.scss';


// TODO: Explore the oppertunity to use useContext for a candidate, as 
// there is now quite alot of prop drilling
export default function CandidateProfile({
    candidate,
    candidatePerformedInsightWork
}: {
    candidate: ICandidate
    candidatePerformedInsightWork: IInsight[]
}): ReactElement {
    return (
        <div>
            <div className={style.candidateProfile}>
                <div className={style.candidateInfo}>
                    <People width={'5rem'} height={'5rem'}/>
                    <Heading size="medium">{candidate.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
                <CandidateProperties {...candidate}/>
                <CandidatePerfomedInsight insight={candidatePerformedInsightWork}/>
            </div>
        </div>
    );
}