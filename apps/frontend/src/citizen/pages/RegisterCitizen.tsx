/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { HandsHeart } from '@navikt/ds-icons';
import { BodyLong, Heading, Panel, TextField } from '@navikt/ds-react';
import React, { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useCriteriaCategory, useUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { CriteriaRegistrationContainer } from '../containers/registration/CriteriaRegistrationContainer';
import style from './RegisterCitizen.module.scss';

export const RegisterCitizen = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();
    const { categories } = useCriteriaCategory();

    const [citizen, setCitizen] = useState<ICitizen>(user);

    useEffect(() => {
        setCitizen(user);
    }, [user]);

    return (
        <>
            {user ? (
                <>
                    <Panel className={style.registrationInfoContainer}>
                        <div className={style.heartIconContainer}>
                            <HandsHeart height='2rem' width='2rem'/>
                        </div>
                        <Heading size="large" className={style.registrationInfo}> Velkommen til innbyggerpanelet!</Heading>
                        <BodyLong className={style.registrationInfo}>
                        For å bli med i innbyggerpanelet ønsker vi at du registrerer noen opplysninger om deg selv. 
                        Du kan endre dem når som helst inne på “min side”. Vi vil ha denne informasjonen for å finne 
                        de undersøkelsene som passer best til din situasjon.
                        </BodyLong>
                    </Panel>
                    <Panel className={style.citizenInfoInputContainer}>
                        <TextField label="Navn"/>
                        <TextField label="Alder (år)" className={style.ageInput}/>
                        <TextField label="Telefonnummer" className={style.phoneInput} />
                    </Panel>
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
                </>
            ) : (
                <APIHandler loading={loading} error={error}/>
            )}
        </>
    );
};