import { Heading, Panel } from '@navikt/ds-react';
import React, { ReactElement, useState } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import { People } from '@navikt/ds-icons';
import {
    EnumCandidateStatus,
    ICandidate,
    IInsight,
    IUser,
} from '@innbyggerpanelet/api-interfaces';
import style from './UserProfile.module.scss';
import { mocks } from '../../utils/mocks';
import { UserProperties, UserPerformedInsight } from '.';

// TODO: Explore the oppertunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export function UserProfile(): ReactElement {
    // Query user for info
    const [user, setUser] = useState<IUser>(mocks.olaUser);
    const [candidatures, setCandidatures] = useState<ICandidate[]>(
        mocks.olaCandidatures
    );

    return (
        <Panel>
            <div className={style.candidateInfo}>
                <People width={'5rem'} height={'5rem'} />
                <Heading size="medium">{user.name}</Heading>
                <CandidateExperiencePoints />
            </div>
            <UserProperties {...user} />
            <UserPerformedInsight candidatures={candidatures} />
        </Panel>
    );
}
