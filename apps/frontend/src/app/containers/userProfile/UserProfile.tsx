import { Heading, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import { People } from '@navikt/ds-icons';
import style from './UserProfile.module.scss';
import { UserProperties, UserPerformedInsight } from '.';
import { useUser } from '../../api/hooks/useUser';
import { APIError } from '../../components/misc/apiError/APIError';

// TODO: Explore the oppertunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export function UserProfile(): ReactElement {
    // Query user for info
    const { user, isLoading, isError } = useUser();

    if (isError) return <APIError error={isError} />;
    if (isLoading || !user) return <Loader />;

    return (
        <>
            <Panel>
                <div className={style.candidateInfo}>
                    <People width={'5rem'} height={'5rem'} />
                    <Heading size="medium">{user.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
            </Panel>
            <Panel>
                <UserProperties {...user} />
            </Panel>
            <Panel>
                <UserPerformedInsight id={user.id} />
            </Panel>
        </>
    );
}
