import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Email, EmailOpened } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';
import { acceptCandidature, declineCandidature } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks';
import style from './Message.module.scss';

interface IProps {
    candidate: ICandidate;
}

export const InvitationMessage = ({ candidate }: IProps): ReactElement => {
    const [candidateValidationErrors, setCandidateValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();
    const [open, setOpen] = useState(false);

    const handleAccept = async () => {
        const { response, error, validationErrors } = await acceptCandidature(candidate);
        if (error) return setPutError(error);
        if (validationErrors) return setCandidateValidationErrors(validationErrors);
        if (response) return;
    };

    const handleDecline = async () => {
        const { response, error, validationErrors } = await declineCandidature(candidate);
        if (error) return setPutError(error);
        if (validationErrors) return setCandidateValidationErrors(validationErrors);
        if (response) return;
    };

    const handleOpen = () => {
        setOpen(!open);
    };

    // Might want to remove this component and only use AlertMessage when consents are properly implemented. Should be cleaner to use the ref property to navigate the user to a consent form.
    return (
        <Panel>
            <div className={style.messageHeading} onClick={handleOpen}>
                {candidate.status !== EnumCandidateStatus.Pending || open ? <EmailOpened /> : <Email />}
                <Heading size="medium">{candidate.insight.name}</Heading>
                <Detail>{candidate.status}</Detail>
            </div>
            <div className={open ? style.open : style.closed}>
                <BodyLong>
                    Hei, du er invitert til <b>{candidate.insight.name}</b> i perioden
                    <b>{' ' + candidate.insight.start + ' til ' + candidate.insight.end}</b> med beskrivelse "
                    {candidate.insight.description}".
                </BodyLong>
                <BodyLong>
                    Vennligst aksepter invitasjonen om du er interessert i å delta, beskjed om nærmere tidspunkt vil
                    komme fortløpende.
                </BodyLong>
                {putError && <APIHandler loading={false} error={putError} />}
                <div className={style.buttonGroup}>
                    <Button onClick={handleDecline}>Avslå</Button>
                    <Button onClick={handleAccept}>Godta</Button>
                </div>
            </div>
        </Panel>
    );
};
