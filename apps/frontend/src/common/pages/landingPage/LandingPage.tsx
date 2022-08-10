import { Right } from '@navikt/ds-icons';
import { BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PanelNoBackground } from '../../components/panelNoBackground';
import style from './LandingPage.module.scss';

export const LandingPage = (): ReactElement => {
    return (
        <>
            <div className={style.introText}>
                <Heading size="xlarge">Velkommen til innbyggerpanelet</Heading>
                <BodyShort>Vil du hjelpe NAV med å bli bedre? I Innbyggerpanelet kan du få sjansen!</BodyShort>
                <Link to="innlogging">
                    <Button as="div">
                        Bli med <Right />
                    </Button>
                </Link>
            </div>

            <img
                className={style.backgroundImage}
                src="../../../common/assets/reops.png" //Requires longer path for some reason...
                alt="Illustrasjon av mennesker som bærer forskjellige geometrisk objekter."
            />
            <PanelNoBackground className={style.textBox}>
                <Heading size="large">Hva er Innbyggerpanelet?</Heading>
                <BodyLong>
                    Kort fortalt :) Kort fortalt :) HVa kan man bli med på? Hvordan? HVorfor? osv... Innbyggerpanelet er
                    et digitalt panel bestående av innbyggere i Norge som har registrert seg og dermed sagt seg villige
                    til å bli kontaktet angående å delta på ulike typer innsiktsarbeid. Under registreringen vil
                    innbyggeren registrere relevante opplysninger slik at man blir inviteret til det innsiktsarbeidet
                    som er mest relevant for dem. Både registreringen og deltakelse på innsiktsarbeid er samtykkebasert
                    og innbyggeren bestemmer selv hva de vil bli med på. De er anonym fram til de har godtatt samtykket
                    til å være med på innsiktsarbeidet.
                </BodyLong>
            </PanelNoBackground>
            <div className={style.userStory}>
                <PanelNoBackground>
                    <img
                        src="../../../common/assets/userstory.png"
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
    );
};
