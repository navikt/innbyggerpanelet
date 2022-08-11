import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Refresh } from '@navikt/ds-icons';
import { BodyLong, Button, Heading, Label } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { extendCitizenExpirationDate } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import style from './CitizenConsentExpirationControl.module.scss';
interface IProps {
    citizen: ICitizen;
}

export const CitizenConsentExpirationControl = ({ citizen }: IProps): ReactElement => {
    const { expirationDate } = citizen;

    const [putError, setPutError] = useState<AxiosError>();
    const navigate = useNavigate();

    const handleExtendExpirationDate = async () => {
        const { response, error } = await extendCitizenExpirationDate(citizen);
        if (error) return setPutError(error);
        if (response) navigate('/innbygger/profil');
    };

    return (
        <div className={style.wrapper}>
            <Heading size="medium">Utsett utløpsdato på generelt samtykke</Heading>
            <BodyLong>
                Et år fra datoen du registrerte din bruker vil ditt generelle samtykke utløpe. Da vil alle opplysninger
                om deg slettes fra Innbyggerpanelet, og du vil ikke lenger være tilgjengelig for innsiktsarbeid med NAV.
                Om du ønsker å utsette utløpsdatoen kan du gjøre det ved å trykke på knappen under, da vil utløptsdatoen
                bli satt til et år fra i dag.
            </BodyLong>
            <Label>Utløpsdato: {expirationDate}</Label>
            <Button onClick={handleExtendExpirationDate}>
                <Refresh /> Utsett utløpsdato
            </Button>
            {putError && <APIHandler loading={false} error={putError} />}
        </div>
    );
};
