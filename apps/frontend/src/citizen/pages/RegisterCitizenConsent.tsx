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
            {/* TODO: Move text to separet file */}
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
            <ConsentTextPanel 
                header='Hva innebærer det for meg å registrere meg i Innbyggerpanelet?'
                paragraphs={[
                    `Er du aktuell for en undersøkelse vil du få en tekstmelding på din mobiltelefon 
                    om at du har en ny invitasjon i Innbyggerpanelet.  Invitasjonen kan du lese 
                    ved å logge på innbyggerpanelet.`,
                    `Der står det hva innsiktsarbeidet innebærer, og du vil få muligheten til å delta 
                    dersom du samtykker til vilkårene. Dersom du samtykker vil ansvarlig for 
                    innsiktsarbeid få din kontaktformasjon. Deretter tar vi kontakt.`
                ]}
            />
            <ConsentTextPanel 
                header='Innbyggerpanelet er frivillig'
                paragraphs={[
                    `Det er frivillig å registrere seg i innbyggerpanelet. Du kan når som helst trekke 
                    tilbake samtykke uten å oppgi grunn.`
                ]}
            />
            <ConsentTextPanel 
                header='Mottar du tjenester fra NAV?'
                paragraphs={[
                    'Deltakelse i Innbyggerpanelet påvirket ikke dine rettigheter i NAV.',
                    `Vi har ikke tilgang til dine saker, og opplysningene du registrer her kan ikke 
                    kobles til disse. `
                ]}
            />
            <ConsentTextPanel 
                header='Hvilke personopplysninger behandles i Innbyggerpanelet og hvordan oppbevares de?'
                paragraphs={[
                    `Velger du å registrere deg i innbyggerpanelet må du oppgi: navn, telefonnummer og 
                    personnummer.`,
                    `I tillegg har du mulighet til å registrere aktuell landsdel, morsmål, utdanning, 
                    digitale ferdigheter, bransje, type pengestøtte du mottar fra NAV, funksjonsvariasjon, 
                    eller hjelpemiddelkategori.`,
                    `Det er kun du som har tilgang til å se din profil. Dersom du samtykker til å være 
                    med på en konkret undersøkelse vil det aktuelle prosjektet se din kontaktinformasjon 
                    og de kriteriene som er relevant for denne undersøkelsen. Disse personene har taushetsplikt.`,
                    `Du kan når som helst se, redigere eller slette profilen din ved å logge deg på 
                    innbyggerpanelet. Profilen din vil bli slettet etter 12 måneder dersom du ikke fornyer 
                    samtykke ditt innen den tid. Du vil få varsel når utløpsdato nærmer seg. `
                ]}
            />
            <Panel className={style.consentTextContainer}>
                <Heading size="small">Dine rettigheter</Heading>
                <ul>
                    <li>
                        {`Du har rett til å få innsyn i hvilke opplysninger vi behandler om deg, og å 
                        få utlevert en kopi av opplysningene.`}
                    </li>
                    <li>
                        {'Du har rett til å få rettet opplysninger om deg som er feil eller misvisende.'}
                    </li>
                    <li>
                        {'Du har rett til å få slettet personopplysninger om deg.'}
                    </li>
                    <li>
                        {`Du har rett til å sende klage til Datatilsynet om behandlingen av dine 
                        personopplysninger: `}
                        <a href='https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/'>
                            https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/
                        </a>
                        .
                    </li>
                </ul>
                <p>
                    {`Ønsker du å se, rette eller slette dine personopplysninger så kan du trykke på min 
                    profil å følge instruksjonene der.`}
                </p>
                <p>
                    {`Har du spørsmål om innbyggerpanelet eller ønsker å vite mer om dine rettigheter kan 
                    du kontakte  Ståle Kjone e-post: …..@nav.no.`}
                </p>
                <p className={style.moreInformationContianer}>
                    {'Mer om personvern: '} 
                    <a href='http://nav.no'>NAVS personvernerklæring</a> 
                    <a href='https://www.datatilsynet.no/rettigheter-og-plikter/virksomhetenes-plikter/personvernombud/'>Kontakt personvernombudet</a>
                </p>
            </Panel>
        </>
    );
};