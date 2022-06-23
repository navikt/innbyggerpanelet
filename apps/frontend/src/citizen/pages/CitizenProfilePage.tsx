/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { People } from '@navikt/ds-icons';
import { Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { CitizenCriteriasContainer, CitizenPerformedInsight } from '../containers';
import style from './pages.module.scss';

// TODO: Explore the opportunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export const CitizenProfilePage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    return (
        <>
            {user ? (
                <>
                    <Panel>
                        <Link to={'rediger'}>
                            <Button>Rediger</Button>
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
                </>
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
        </>
    );
};
