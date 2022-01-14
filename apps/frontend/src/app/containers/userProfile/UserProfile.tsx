import { Heading } from '@navikt/ds-react';
import React, { ReactElement, useState } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import { People } from '@navikt/ds-icons';
import UserPerfomedInsight from './UserPerformedInsight';
import CandidateProperties from './UserProperties';
import { ICandidate, IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import style from './UserProfile.module.scss';
import UserProperties from './UserProperties';

// TODO: Explore the oppertunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export default function UserProfile({
    user,
    candidatePerformedInsightWork,
}: {
    user: IUser;
    candidatePerformedInsightWork: IInsight[];
}): ReactElement {
    return (
        <div>
            <div className={style.candidateProfile}>
                <div className={style.candidateInfo}>
                    <People width={'5rem'} height={'5rem'} />
                    <Heading size="medium">{user.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
                <UserProperties {...user} />
                <UserPerfomedInsight candidatures={user.candidatures} />
            </div>
        </div>
    );
}
