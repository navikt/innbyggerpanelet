import { ICandidate } from '@innbyggerpanelet/api-interfaces';
import { ReactElement } from 'react';
import { InvitationMessage } from '../../components/messages/InvitationMessage';

interface IProps {
    candidates: ICandidate[];
}
export const Invitations = ({ candidates }: IProps): ReactElement => {
    return (
        <>
            {candidates.map((candidate, index) => (
                <InvitationMessage key={index} candidate={candidate} />
            ))}
        </>
    );
};
