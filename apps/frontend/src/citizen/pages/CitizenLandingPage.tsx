import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { UserInfo } from '../../common/components/userInfo';
import style from './CitizenLandingPage.module.scss';
export const CitizenLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    return (
        <div className={style.landingPageWrapper}>
            {user ? (
                <UserInfo name={user.firstname + ' ' + user.surname} />
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
            <div className={style.selectionCardsWrapper}>
                <Link to={'profil'} className={style.selectionCard}>
                    <Heading size="medium">Min profil</Heading>
                    <BodyShort>
                        Min profil er en oversikt over den informasjonen du har lagt inn om deg selv. Du kan se, endre
                        og slette informasjonen her.
                    </BodyShort>
                </Link>
                <Link to={'404'} className={style.selectionCard}>
                    <Heading size="medium">Mine deltakelser</Heading>
                    <BodyShort>Mine deltakelser er en oversikt over alt innsiktsarbeidet du har deltatt på.</BodyShort>
                </Link>
                <Link to={'404'} className={style.selectionCard}>
                    <Heading size="medium">Mine samtykker</Heading>
                    <BodyShort>
                        Mine samtykker er en oversikt over dine samtykker. Du kan se, redigere og trekke ditt samtykke
                        her.
                    </BodyShort>
                </Link>
            </div>
        </div>
    );
};
