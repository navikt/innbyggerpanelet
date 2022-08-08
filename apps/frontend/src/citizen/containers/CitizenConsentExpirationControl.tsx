import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Refresh } from '@navikt/ds-icons';
import { Button, Panel, TextField } from '@navikt/ds-react';
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
        <Panel>
            <div className={style.expiration}>
                <TextField
                    label="Utløpsdato"
                    id="expirationDate"
                    name="expirationDate"
                    disabled={true}
                    value={expirationDate}
                />
                <Button onClick={handleExtendExpirationDate}>
                    <Refresh />
                </Button>
            </div>
            {putError && <APIHandler loading={false} error={putError} />}
        </Panel>
    );
};
