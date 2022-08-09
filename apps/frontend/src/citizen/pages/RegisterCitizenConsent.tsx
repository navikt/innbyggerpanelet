import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { HandsHeart } from '@navikt/ds-icons';
import { Heading, Panel } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';
import { ConsentTextPanel } from '../components/ConsentTextPanel';
import style from './RegisterCitizenConsent.module.scss';

export const RegisterCitizenConsent = (): ReactElement => {
    
    const location = useLocation();
    const citizen = location.state as ICitizen;


    return (
        <>
            <Panel className={style.headerContainer}>
                <div className={style.heartIconContainer}>
                    <HandsHeart height='2rem' width='2rem'/>
                </div>
                <Heading size="large" className={style.consentHeader}>
                    Samtykke til registrering i Innbyggerpanelet
                </Heading>
            </Panel>
            <ConsentTextPanel 
                header='Hva er Innbyggerpanelet?'
                paragraphs={[
                    `For å levere gode tjenester er NAV avhengig av å involvere og 
                    få tilbakemelding fra Navs brukere.`,
                    `Som frivillig deltager i Innbyggerpanelet har du muligheten til 
                    å gi dine tilbakemeldinger og innspill på Navs løsninger og tjenester.`,
                    `Hvis du velger å registrere deg, kan du bli kontaktet for å delta på 
                    konkrete innsiktarbeid. Løsningen håndterere kommunikasjonen og 
                    samtykke til dette. Opplysningene du oppgir under denne registeringen, 
                    brukes kun for å finne relevante løsninger og tjenester du kan gi innspill til.`
                ]}
            />
            <ConsentTextPanel 
                header='Hvem har ansvar for Innbyggerpanelet?'
                paragraphs={[
                    `NAV Arbeid- og velferdsdirektoratet er behandlingsansvarlig for Innbyggerpanelet. 
                    Innbyggerpanelet driftes av IT-avdelingen til Arbeid- og velferdsdirektoratet (NAV). `
                ]}
            />
        </>
    );
};