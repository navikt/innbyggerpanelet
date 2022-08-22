import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Alert, Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../common/api/hooks';
import { updateCitizen } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks';
import { CitizenContactInfoForm, CitizenEditCriterias } from '../containers';
import style from './CitizenProfileEditPage.module.scss';

export const CitizenProfileEditPage = (): ReactElement => {
    const navigate = useNavigate();

    const { user, loading, error } = useUser<ICitizen>();

    const [citizen, setCitizen] = useState<ICitizen>(user || {});
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await updateCitizen(citizen);
        if (error) return setPutError(error);
        if (validationErrors) return setCitizenValidationErrors(validationErrors);
        if (response) navigate('/innbygger/profil');
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        navigate('/innbygger/profil');
    };

    return (
        <>
            <CitizenContactInfoForm
                citizen={citizen}
                setCitizen={setCitizen}
                validationErrors={citizenValidationErrors}
            />
            <CitizenEditCriterias
                citizen={citizen}
                setCitizen={setCitizen}
                validationErrors={citizenValidationErrors}
            />
            <div className={style.criteriaAlert}>
                <Alert variant='info'>
                    Selv om du oppdaterer et kriterie som er brukt i et innsiktsarbeid,
                    må du selv trekke samtykket hvis du ikke ønsker å være en del av det.
                </Alert>
            </div>
            <Panel>
                {putError && <APIHandler loading={loading} error={putError} />}
                <div className={style.editButtons}>
                    <Button onClick={handleSubmit}>Oppdater</Button>
                    <Button variant="danger" onClick={handleCancel}>
                        Avbryt
                    </Button>
                </div>
            </Panel>
        </>
    );
};
