/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../common/api/hooks';
import { createCitizen } from '../../common/api/mutations/';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks/';
import { CitizenContactInfoForm, CitizenEditCriterias } from '../containers';
import style from './RegisterCitizenPage.module.scss';

export const RegisterCitizenPage = (): ReactElement => {
    const navigate = useNavigate();
    const { user, loading, error } = useUser<ICitizen>();

    const [citizen, setCitizen] = useState<ICitizen>(user);
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();
    const [postError, setPostError] = useState<AxiosError>();

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await createCitizen(citizen);
        if (error) return setPostError(error);
        if (validationErrors) return setCitizenValidationErrors(validationErrors);
        if (response) navigate('/innbygger/profil');
    };

    return (
        <>
            {user ? (
                <>
                    <Panel>
                        <Heading size="medium">Velkommen til Innbyggerpanelet!</Heading>
                        <BodyLong>
                            For å bli med i innbyggerpanelet ønsker vi at du registrerer noen opplysninger om deg selv.
                            Du må fylle inn navn og telefonnummer. Resten av feltene velger du selv hvor mange du vil
                            fylle inn, og du kan endre dem når som helst inne på “min side”. Vi trenger denne
                            informasjonen for å finne de undersøkelsene som passer best til din situasjon.
                        </BodyLong>
                    </Panel>
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
