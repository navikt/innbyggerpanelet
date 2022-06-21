import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { People } from '@navikt/ds-icons';
import { Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { UserCriterias, UserPerformedInsight } from '.';
import CandidateExperiencePoints from '../../components/candidateProfile/CandidateExperiencePoints';
import style from './UserProfile.module.scss';

interface IProps {
    citizen: ICitizen;
    toggleEdit: () => void;
}

// TODO: Explore the opportunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export const CitizenDisplayProfile = ({ citizen, toggleEdit }: IProps): ReactElement => {
    return (
        <>
            <Panel>
                <Button onClick={toggleEdit}>Rediger</Button>
                <div className={style.candidateInfo}>
                    <People width={'5rem'} height={'5rem'} />
                    <Heading size="medium">{citizen.firstname + ' ' + citizen.surname}</Heading>
                    <CandidateExperiencePoints />
                </div>
            </Panel>
            <Panel>
                <UserCriterias criterias={citizen.criterias} />
            </Panel>
            <Panel>
                <UserPerformedInsight id={citizen.id} />
            </Panel>
        </>
    );
};
