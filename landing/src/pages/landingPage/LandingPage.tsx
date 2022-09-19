import { Right } from '@navikt/ds-icons'
import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { PanelNoBackground } from '../../components/panelNoBackground/PanelNoBackground'
import style from './LandingPage.module.scss'

export const LandingPage = (): ReactElement => {
    return (
        <>
            <div className={style.introText}>
                <PanelNoBackground className={style.textBox}>
                    <Heading size="xlarge">Bli med på å gjøre NAV bedre</Heading>
                    <BodyShort className={style.textBox}>
                        Som deltaker i Innbyggerpanelet har du muligheten til å bidra til at NAVs tjenester forbedres. 
                        Du inviteres til ulike undersøkelser som du selv velger om du vil delta på.
                    </BodyShort>
                </PanelNoBackground>
                <Link to="innlogging">
                    <Button as="div">
                        <div className={style.joinButton}>Bli med <Right /></div>
                    </Button>
                </Link>
            </div>

            <img
                className={style.backgroundImage}
                src="src/assets/reops.png" //Requires longer path for some reason...
                alt="Illustrasjon av mennesker som bærer forskjellige geometrisk objekter."
            />
            <PanelNoBackground className={style.textBox}>
                <Heading size="large">Hva er Innbyggerpanelet?</Heading>
                <BodyShort>
                    For å levere gode tjenester er NAV avhengig av å involvere og få tilbakemelding fra Navs brukere.
                </BodyShort>
                <BodyShort>
                    Som frivillig deltager i Innbyggerpanelet har du muligheten til å gi dine tilbakemeldinger og 
                    innspill på Navs løsninger og tjenester.
                </BodyShort>
                <BodyLong>
                    Hvis du velger å registrere deg, kan du bli kontaktet for å delta på konkrete innsiktarbeid. 
                    Slike innsiktsarbeid kan være intervju, brukertest, spørreundersøkelser, osv.  Løsningen håndterer 
                    kommunikasjonen og samtykke til dette. Opplysningene du oppgir under denne registeringen, brukes 
                    kun for å finne relevante løsninger og tjenester du kan gi innspill til. 
                </BodyLong>
                <BodyShort>
                    Som deltaker i Innbyggerpanelet har du god kontroll over dine perosnopplysninger, og kan når som helst se, 
                    redigere eller slette ditt samtykke til å være deltaker i panelet eller et konkret innsiktsarbeid. 
                </BodyShort>
            </PanelNoBackground>
            <div className={style.userStory}>
                <PanelNoBackground>
                    <img
                        src="src/assets/userstory.png"
                        alt="Illustrasjon som forklarer brukerreisen i Innbyggerpanelet."
                    />
                </PanelNoBackground>
            </div>
            <PanelNoBackground className={style.textBox}>
                <Heading size="large">Bli med!</Heading>
                <BodyShort>Vi trenger din hjelp. Registrer deg nå, og bli med på å gjøre NAV bedre!</BodyShort>
                <Link to="innlogging">
                    <Button as="div">Registrer deg</Button>
                </Link>
            </PanelNoBackground>
            <div className={style.footer}></div>
        </>
    )
}
