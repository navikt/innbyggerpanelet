import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import { updateCitizen } from '../../api/mutations/mutateCitizen';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import { CitizenContactInfoForm, CitizenEditCriterias } from '../containers';
import style from './pages.module.scss';

export const CitizenProfileEditPage = (): ReactElement => {
    const navigate = useNavigate();

    const { user, loading, error } = useUser<ICitizen>();

    const [citizen, setCitizen] = useState<ICitizen>(user || {});
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...citizen };
        result[event.target.id] = event.target.value;
        setCitizen(result);
    };

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
                handleChange={handleChange}
                validationErrors={citizenValidationErrors}
            />
            <CitizenEditCriterias
                citizen={citizen}
                setCitizen={setCitizen}
                validationErrors={citizenValidationErrors}
            />
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
