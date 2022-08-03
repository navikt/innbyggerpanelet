import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { BodyLong, Detail, Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './InsightConsentForm.module.scss';

interface IProps {
    insight: IInsight;
}

export const InsightConsentForm = ({ insight }: IProps): ReactElement => {
    const { project, consents } = insight;

    return (
        <div className={style.wrapper}>
            <Heading size="xlarge">Samtykke for innsiktsarbeidet: {insight.name}</Heading>
            <Detail>
                Periode for arbeidet: {insight.start} til {insight.end}
            </Detail>
            <BodyLong>Generell tekst om hva innbyggeren er i ferd med å lese.</BodyLong>
            <Heading size="large">Hva er formålet med dette innsiktsarbeidet?</Heading>
            <BodyLong>{insight.description}</BodyLong>
            <Heading size="large">Hva slags metoder vil bli benyttet under arbeidet?</Heading>
            <BodyLong>
                Innsikt kan bli hentet på mange måter, her vil du få en oversikt over hvilket metoder vi ønsker å bruke
                i dette arbeidet.
            </BodyLong>
            {consents.map((consent, index) => (
                <div key={index}>
                    <Heading size="medium">{consent.template.title}</Heading>
                    <BodyLong>{consent.template.description}</BodyLong>
                    {consent.justification && <Detail>Kommentar: {consent.justification}</Detail>}
                </div>
            ))}
            <Heading size="large">Hvordan behandler vi dine personopplysninger?</Heading>
            <BodyLong>
                Ved å fylle ut og (sende inn) dette skjema samtykker du til at vi lagrer dine kontaktopplysninger og de
                opplysningene som fremkommer under intervjuet. Disse personopplysningene vil for en begrenset periode
                lagres i NAVs systemer med tilgangsstyring: Personopplysningene vil kun brukes til denne undersøkelsen.
                I denne undersøkelsen er det kun ({project.members.length}) person som har tilgang til dine
                personopplysninger. Disse personene har taushetsplikt. dvs. plikt til å hemmeligholde opplysningene og
                hindre at uvedkomne får tilgang.
            </BodyLong>
            <BodyLong>
                Når innsiktsarbeidet er ferdig, vil svarene dine anonymiseres. Anonymiseringen gjennomføres så fort som
                mulig. Opplysningene som kan lede tilbake til deg slettes så snart anonymiseringen er gjennomført og
                senest innen (6) måneder.
            </BodyLong>
            <Heading size="large">Må jeg delta i innsiktsarbeidet?</Heading>
            <BodyLong>
                Nei det er <b>frivillig</b> å delta. Mottar du tjenester fra NAV, vil ikke deltakelse i denne
                undersøkelsen påvirke dine rettigheter i NAV. Vi har ikke tilgang til dine saker. Andre i NAV får heller
                ikke vite hvem som deltar i undersøkelsen, og opplysningene du gir kan ikke kobles til dine saker.
            </BodyLong>
            <Heading size="medium">Dine rettigheter: </Heading>
            <ul>
                <li>
                    Det er friilling å delta. Du kan når som helst trekke tilbake samtykke underveis i intervjuet, eller
                    etter at det er ferdig uten å oppgi grunn.
                </li>
                <li>
                    Du har rett til å få innsyn i hvilke opplysninger vi behandler om deg, og å få utlevert en kopi av
                    opplysningene.
                </li>
                <li>Du har rett til å få rettet opplysninger om deg som er feil eller misvisende </li>
                <li>Du har rett til å få slettet dine personopplysninger </li>
                <li>Du har rett til å sende klage til Datatilsynet om behandlingen av dine personopplysninger. </li>
            </ul>
            <Heading size="large">Samtykke</Heading>
            <BodyLong>Med dette samtykker jeg til overnevnte punktene... osv...</BodyLong>
        </div>
    );
};
