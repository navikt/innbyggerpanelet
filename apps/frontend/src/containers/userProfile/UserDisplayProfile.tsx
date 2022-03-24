import { Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import { People } from '@navikt/ds-icons';
import { UserCriterias, UserPerformedInsight } from '.';

import style from './UserProfile.module.scss';
import { IUser } from '@innbyggerpanelet/api-interfaces';

interface IProps {
    user: IUser;
    toggleEdit: () => void;
}

// TODO: Explore the opportunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export const UserDisplayProfile = ({ user, toggleEdit }: IProps): ReactElement => {
    return (
        <>
            <Panel>
                <Button onClick={toggleEdit}>Rediger</Button>
                <div className={style.candidateInfo}>
                    <People width={'5rem'} height={'5rem'} />
                    <Heading size="medium">{user.name}</Heading>
                    <CandidateExperiencePoints />
                </div>
            </Panel>
            <Panel>
                <UserCriterias criterias={user.criterias} />
            </Panel>
            <Panel>
                <UserPerformedInsight id={user.id} />
            </Panel>
        </>
    );
};
