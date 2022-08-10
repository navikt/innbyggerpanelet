/* eslint-disable react/jsx-no-useless-fragment */
import { ICandidate, ICitizen, ICriteria, IMessage } from '@innbyggerpanelet/api-interfaces';
import { Delete, Download, People } from '@navikt/ds-icons';
import { Accordion, BodyShort, Button, Heading } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import { useFullCitizen, useMessages, useUser } from '../../common/api/hooks';
import { deleteCitizen } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { PageHeader } from '../../common/components/pageHeader';
import { PanelNoBackground } from '../../common/components/panelNoBackground';
import { CitizenConsentExpirationControl, CitizenCriteriasContainer } from '../containers';
import style from './CitizenProfilePage.module.scss';

interface CitizenData {
    firstname: string;
    surname: string;
    phone: string;
    pnr: string;
    criterias: ICriteria[];
    messages: IMessage[];
    candidates: ICandidate[];
}

// TODO: Explore the opportunity to use useContext for a candidate, as
// there is now quite alot of prop drilling
export const CitizenProfilePage = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();

    const { fullCitizen } = useFullCitizen();
    const { messages } = useMessages();

    const [deleteError, setDeleteError] = useState<AxiosError>();

    const onDownloadCitizenData = () => {
        if (fullCitizen) {
            const citizenData: CitizenData = {
                firstname: fullCitizen.firstname,
                surname: fullCitizen.surname,
                phone: fullCitizen.phone,
                pnr: fullCitizen.pnr,
                criterias: fullCitizen.criterias,
                messages: messages!,
                candidates: fullCitizen.candidates
            };

            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify(citizenData))}`;

            const link = document.createElement('a');
            link.href = jsonString;
            link.download = `${citizenData.firstname}-${citizenData.surname}-persondata.json`;

            link.click();
        }
    };

    const handleDeleteCitizen = async () => {
        const { response, error } = await deleteCitizen();
        if (error) return setDeleteError(error);
        if (response) window.location.replace('/api/auth/logout');
    };

    return (
        <>
            {user ? (
                <>
                    <PageHeader title="Min profil" icon={<People />} />
                    <PanelNoBackground>
                        <Accordion>
                            <Accordion.Item>
                                <Accordion.Header>Opplysninger</Accordion.Header>
                                <Accordion.Content>
                                    <CitizenCriteriasContainer criterias={user.criterias} />
                                    <Link to={'rediger'}>
                                        <Button as="div">Endre opplysninger</Button>
                                    </Link>
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header>Samtykke til Innbyggerpanelet</Accordion.Header>
                                <Accordion.Content>
                                    <CitizenConsentExpirationControl citizen={user} />
                                </Accordion.Content>
                            </Accordion.Item>
                            <Accordion.Item>
                                <Accordion.Header>Administrer profil</Accordion.Header>
                                <Accordion.Content>
                                    <div className={style.admin}>
                                        <Heading size="medium">Vil du slette profilen din?</Heading>
                                        <BodyShort>
                                            Ved å trykke her sletter du profilen din. Alle samtykker vil bli trukket og
                                            du vil ikke lenger motta invitasjoner til nye innsiktsarbeid. Om du ønsker å
                                            melde deg inn i Innbyggerpanelet igjen i fremtiden, vil du måtte opprette
                                            profilen din på nytt.
                                        </BodyShort>
                                        {deleteError && <APIHandler loading={false} error={deleteError} />}
                                        <Button as="div" onClick={handleDeleteCitizen}>
                                            Slett profil <Delete />
                                        </Button>
                                    </div>
                                    <div className={style.admin}>
                                        <Heading size="medium">Dataportabilitet</Heading>
                                        <BodyShort>Last ned all personlig informasjon i JSON format.</BodyShort>
                                        <Button as="div" onClick={onDownloadCitizenData}>
                                            Last ned persondata <Download />
                                        </Button>
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        </Accordion>
                    </PanelNoBackground>
                </>
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
        </>
    );
};
