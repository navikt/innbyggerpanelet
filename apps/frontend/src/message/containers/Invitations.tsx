import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { ShakeHands } from '@navikt/ds-icons';
import { ReactElement } from 'react';
import { InvitationMessage, PageHeader } from '../components/';

interface IProps {
    candidates: ICandidate[];
}
export const Invitations = ({ candidates }: IProps): ReactElement => {
    return (
        <>
            <PageHeader title="Mine invitasjoner" icon={<ShakeHands />} />
            {candidates.map((candidate, index) => (
                <InvitationMessage key={index} candidate={candidate} />
            ))}
        </>
    );
};
