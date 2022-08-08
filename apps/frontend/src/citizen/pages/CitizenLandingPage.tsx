import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { People } from '@navikt/ds-icons';
import { BodyShort, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { PageHeader } from '../../common/components/pageHeader';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import style from './CitizenLandingPage.module.scss';
export const CitizenLandingPage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    return (
        <>
            {user ? (
                <PageHeader title={user?.firstname + ' ' + user?.surname} icon={<People />} />
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
            <PanelNoBackground className={style.selectionCardsWrapper}>
                <Link to={'profil'} className={style.selectionCard}>
                    <Heading size="medium">Min profil</Heading>
                    <BodyShort>
                        Min profil er en oversikt over den informasjonen du har lagt inn om deg selv. Du kan se, endre
                        og slette informasjonen her.
                    </BodyShort>
                </Link>
                <Link to={'deltagelser'} className={style.selectionCard}>
                    <Heading size="medium">Mine deltakelser</Heading>
                    <BodyShort>Mine deltakelser er en oversikt over alt innsiktsarbeidet du har deltatt på.</BodyShort>
                </Link>
            </PanelNoBackground>
        </>
    );
};
