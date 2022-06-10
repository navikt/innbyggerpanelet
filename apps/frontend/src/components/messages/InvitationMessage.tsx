import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Email } from '@navikt/ds-icons';
import { BodyLong, Button, Detail, Heading, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ReactElement, useState } from 'react';
import { acceptCandidature, declineCandidature } from '../../api/mutations/mutateCandidate';
import { useValidationErrors } from '../../core/hooks/useValidationErrors';
import { APIHandler } from '../misc/apiHandler';
import style from './Message.module.scss';

interface IProps {
    candidate: ICandidate;
}

export const InvitationMessage = ({ candidate }: IProps): ReactElement => {
    const [candidateValidationErrors, setCandidateValidationErrors] = useValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

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

    return (
        <Panel>
            <div className={style.messageHeading}>
                <Email />
                <Heading size="medium">{candidate.insight.name}</Heading>
            </div>
            <Detail>{candidate.status}</Detail>
            <BodyLong>
                Hei, du er invitert til <b>{candidate.insight.name}</b> i perioden
                <b>{' ' + candidate.insight.start + ' til ' + candidate.insight.end}</b> med beskrivelse "
                {candidate.insight.description}".
            </BodyLong>
            <BodyLong>
                Vennligst aksepter invitasjonen om du er interessert i å delta, beskjed om nærmere tidspunkt vil komme
                fortløpende.
            </BodyLong>
            {putError && <APIHandler loading={false} error={putError} />}
            <div className={style.buttonGroup}>
                <Button onClick={handleDecline}>Avslå</Button>

                <Button onClick={handleAccept}>Godta</Button>
            </div>
        </Panel>
    );
};
