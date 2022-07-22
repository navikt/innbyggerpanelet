import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Email, EmailOpened } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './Message.module.scss';

interface IProps {
    candidate: ICandidate;
}

export const InvitationMessage = ({ candidate }: IProps): ReactElement => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    };

    // Might want to remove this component and only use AlertMessage when consents are properly implemented. Should be cleaner to use the ref property to navigate the user to a consent form.
    return (
        <Panel>
            <div className={style.messageHeading} onClick={handleOpen}>
                {candidate.status !== EnumCandidateStatus.Pending || open ? <EmailOpened /> : <Email />}
                <Heading size="medium">{candidate.insight.name}</Heading>
            </div>
            <div className={open ? style.open : style.closed}>
                <Detail>{candidate.status}</Detail>
                <BodyLong>
                    Hei, du er invitert til <b>{candidate.insight.name}</b> i perioden
                    <b>{' ' + candidate.insight.start + ' til ' + candidate.insight.end}</b> med beskrivelse "
                    {candidate.insight.description}".
                </BodyLong>
                <BodyLong>
                    Vennligst aksepter invitasjonen om du er interessert i å delta, beskjed om nærmere tidspunkt vil
                    komme fortløpende.
                </BodyLong>
                <div className={style.buttonGroup}>
                    <Button as="div" variant="secondary">
                        Avslå invitasjon
                    </Button>

                    <Link to={`/innbygger/innsikt/${candidate.insight.id}`}>
                        <Button as="div">Gå til samtykkeskjema</Button>
                    </Link>
                </div>
            </div>
        </Panel>
    );
};
