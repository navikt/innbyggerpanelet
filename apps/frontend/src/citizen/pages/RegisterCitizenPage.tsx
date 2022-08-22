/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { HandsHeart } from '@navikt/ds-icons';
import { BodyLong, Button, Panel, TextField } from '@navikt/ds-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCriteriaCategory, useUser } from '../../common/api/hooks';
import { updateCitizen } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { PageHeader } from '../../common/components/pageHeader';
import { useFormatValidationErrors } from '../../common/hooks';
import { CriteriaRegistrationContainer } from '../containers/registration/CriteriaRegistrationContainer';
import style from './RegisterCitizenPage.module.scss';

export const RegisterCitizen = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();
    const { categories } = useCriteriaCategory();

    const [citizen, setCitizen] = useState<ICitizen>(user);
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();

    const navigate = useNavigate();

    useEffect(() => {
        setCitizen(user);
    }, [user]);

    const handleContactInfoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...citizen };
        result[event.target.id] = event.target.value;
        setCitizen(result);
    };

    const onCancel = () => {
        navigate('/');
    };

    const onNext = async () => {
        const { response, validationErrors, error } = await updateCitizen(citizen);

        if (validationErrors) return setCitizenValidationErrors(validationErrors);
        if (response) navigate('/innbygger/registrer/samtykke', { state: citizen });
    };

    return (
        <>
            {user ? (
                <>
                    <PageHeader 
                        title="Velkommen til innbyggerpanelet!"
                        icon={<HandsHeart />}
                    >
                        <BodyLong className={style.registrationInfo}>
                        For å bli med i innbyggerpanelet ønsker vi at du registrerer noen opplysninger om deg selv. 
                        Du kan endre dem når som helst inne på “min side”. Vi vil ha denne informasjonen for å finne 
                        de undersøkelsene som passer best til din situasjon.
                        </BodyLong>
                    </PageHeader>
                    <Panel className={style.citizenInfoInputContainer}>
                        <TextField 
                            label="Fornavn"
                            description="Obligatorisk"
                            id="firstname"
                            name="firstname"
                            value={citizen?.firstname || ''}
                            onChange={handleContactInfoChange}
                            error={citizenValidationErrors.firstname}
                            className={style.input}
                        />
                        <TextField 
                            label="Etternavn"
                            description="Obligatorisk"
                            id="surname"
                            name="surname"
                            value={citizen?.surname || ''}
                            onChange={handleContactInfoChange}
                            error={citizenValidationErrors.surname}
                            className={style.input}
                        />
                        <TextField 
                            label="Telefonnummer"
                            description="Obligatorisk"
                            id="phone"
                            name="phone"
                            value={citizen?.phone || ''}
                            onChange={handleContactInfoChange}
                            error={citizenValidationErrors.phone}
                            className={style.phoneInput} 
                        />
                    </Panel>
                    <div>
                        {categories?.map((categorie, index) => {
                            return (
                                <CriteriaRegistrationContainer
                                    key={index}
                                    criteriaCategory={categorie}
                                    citizen={citizen}
                                    setCitizen={setCitizen}
                                />
                            );
                        })}
                        <div className={style.navigationInput}>
                            <Button variant='secondary' onClick={onCancel}>Avbryt</Button>
                            <Button onClick={onNext}>Neste</Button>
                        </div>
                    </div>
                </>
            ) : (
                <APIHandler loading={loading} error={error}/>
            )}
        </>
    );
};