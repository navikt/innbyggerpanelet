/* eslint-disable react/jsx-no-useless-fragment */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { HandsHeart } from '@navikt/ds-icons';
import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import React from 'react';
import { ReactElement } from 'react';
import { useUser } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './RegisterCitizen.module.scss';

export const RegisterCitizen = (): ReactElement => {
    const { user, loading, error } = useUser<ICitizen>();
    
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
                </>
            ) : (
                <APIHandler loading={loading} error={error}/>
            )}
        </>
    );
};