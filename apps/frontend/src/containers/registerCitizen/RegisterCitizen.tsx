/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import { createCitizen } from '../../api/mutations/mutateCitizen';
import { CitizenContactInfoForm, UserEditCriterias } from '../../components/citizen';
import { APIHandler } from '../../components/misc/apiHandler';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import style from './RegisterUser.module.scss';

export const RegisterCitizen = (): ReactElement => {
    const navigate = useNavigate();
    const { user, loading, error } = useUser<ICitizen>();

    const [citizen, setCitizen] = useState<ICitizen>(user);
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();
    const [postError, setPostError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...citizen };
        result[event.target.id] = event.target.value;
        setCitizen(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await createCitizen(citizen);
        if (error) return setPostError(error);
        if (validationErrors) return setCitizenValidationErrors(validationErrors);
        if (response) navigate('/profil');
    };

    return (
        <>
            {user ? (
                <>
                    <CitizenContactInfoForm
                        citizen={citizen}
                        handleChange={handleChange}
                        validationErrors={citizenValidationErrors}
                    />
                    <UserEditCriterias
                        citizen={citizen}
                        setCitizen={setCitizen}
                        validationErrors={citizenValidationErrors}
                    />
                    <Panel>
                        {postError && <APIHandler loading={false} error={postError} />}
                        <div className={style.submit}>
                            <Button onClick={handleSubmit}>Opprett</Button>
                        </div>
                    </Panel>
                </>
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
        </>
    );
};
