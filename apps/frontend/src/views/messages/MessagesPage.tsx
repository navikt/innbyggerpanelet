import { ReactElement } from 'react';
import { useCandidatesByCurrentUser } from '../../api/hooks';
import { useMessages } from '../../api/hooks/useMessages';
import { APIHandler } from '../../components/misc/apiHandler';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { Inbox } from '../../containers/messages/Inbox';
import { Invitations } from '../../containers/messages/Invitations';

export const MessagesPage = (): ReactElement => {
    const invitations = useCandidatesByCurrentUser();
    const inbox = useMessages();

    return (
        <PanelNoBackground>
            {invitations.candidates ? (
                <Invitations candidates={invitations.candidates} />
            ) : (
                <APIHandler loading={invitations.loading} error={invitations.error} />
            )}
            {inbox.messages ? (
                <Inbox messages={inbox.messages} />
            ) : (
                <APIHandler loading={inbox.loading} error={inbox.error} />
            )}
        </PanelNoBackground>
    );
};
