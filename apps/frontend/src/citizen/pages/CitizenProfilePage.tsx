/* eslint-disable react/jsx-no-useless-fragment */
import { ICandidate, ICitizen, ICriteria, IMessage } from '@innbyggerpanelet/api-interfaces';
import { People } from '@navikt/ds-icons';
import { Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useFullCitizen, useMessages, useUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { CitizenCriteriasContainer, CitizenPerformedInsight } from '../containers';
import style from './CitizenProfilePage.module.scss';

interface CitizenData {
    firstname: string
    surname: string
    phone: string
    pnr: string
    criterias: ICriteria[]
    messages: IMessage[]
    candidates: ICandidate[]
}

// TODO: Explore the opportunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export const CitizenProfilePage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();
    
    const { fullCitizen } = useFullCitizen();
    const { messages } = useMessages();
    const onDownloadCitizenData = () => {
        if (fullCitizen) {
            const citizenData: CitizenData = {
                firstname: fullCitizen!.firstname,
                surname: fullCitizen!.surname,
                phone: fullCitizen!.phone,
                pnr: fullCitizen!.pnr,
                criterias: fullCitizen!.criterias,
                messages: messages!,
                candidates: fullCitizen!.candidates
            };
            console.log(citizenData);
        }
    };

    return (
        <>
            {user ? (
                <>
                    <Panel>
                        <Link to={'rediger'}>
                            <Button as="div">Rediger</Button>
                        </Link>
                        <div className={style.candidateInfo}>
                            <People width={'5rem'} height={'5rem'} />
                            <Heading size="medium">{user.firstname + ' ' + user.surname}</Heading>
                        </div>
                    </Panel>
                    <Panel>
                        <CitizenCriteriasContainer criterias={user.criterias} />
                    </Panel>
                    <Panel>
                        <CitizenPerformedInsight id={user.id} />
                    </Panel>
                    <Button as="div" onClick={onDownloadCitizenData}>
                        Last ned persondata
                    </Button>
                </>
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
        </>
    );
};
