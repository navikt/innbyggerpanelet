import { Heading } from '@navikt/ds-react';
import React, { ReactElement, useState } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import CandidateIcon from '../../components/candidateProfile/CandidateIcon';
import CandidatePerfomedInsight from './CandidatePerformedInsight';
import CandidateProperties from './CandidateProperties';
import { Candidate, Insight } from '@innbyggerpanelet/api-interfaces';
import style from './CandidateProfile.module.scss';


// TODO: Explore the oppertunity to use useContext for a candidate, as 
// there is now quite alot of prop drilling
export default function CandidateProfile({
    candidate,
    candidatePerformedInsightWork
}: {
    candidate: Candidate
    candidatePerformedInsightWork: Insight[]
}): ReactElement {
    return (
        <div>
            <div className={style.candidateProfile}>
                <div className={style.candidateInfo}>
                    <CandidateIcon />
                    <Heading size="medium">{candidate.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
                <CandidateProperties {...candidate}/>
                <CandidatePerfomedInsight {...candidatePerformedInsightWork}/>
            </div>
        </div>
    );
}