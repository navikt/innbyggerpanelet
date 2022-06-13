import { EnumCandidateStatus } from '@innbyggerpanelet/api-interfaces';
import { Email, ShakeHands } from '@navikt/ds-icons';
import { BodyShort } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useCandidatesByCurrentUser } from '../../api/hooks';
import { useMessages } from '../../api/hooks/useMessages';
import { APIHandler } from '../../components/misc/apiHandler';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import PanelTabs from '../../components/misc/panelTabs/PanelTabs';
import { Inbox } from '../../containers/messages/Inbox';
import { Invitations } from '../../containers/messages/Invitations';

enum EnumTabState {
    Invitations = 'INVITATIONS',
    Messages = 'MESSAGES'
}

export const MessagesPage = (): ReactElement => {
    const invitations = useCandidatesByCurrentUser();
    const inbox = useMessages();

    const unansweredInvitations = invitations.candidates?.filter(
        (candidate) => candidate.status === EnumCandidateStatus.Pending
    );
    const unreadMessages = inbox.messages?.filter((message) => !message.read);

    const [tabState, setTabState] = useState<EnumTabState>(EnumTabState.Invitations);

    return (
        <PanelNoBackground>
            <PanelTabs>
                <PanelTabs.TabSelector
                    active={tabState === EnumTabState.Invitations}
                    onClick={() => setTabState(EnumTabState.Invitations)}
                >
                    <ShakeHands />
                    <BodyShort>Invitasjoner {unansweredInvitations && `(${unansweredInvitations.length})`}</BodyShort>
                </PanelTabs.TabSelector>
                <PanelTabs.TabSelector
                    active={tabState === EnumTabState.Messages}
                    onClick={() => setTabState(EnumTabState.Messages)}
                >
                    <Email />
                    <BodyShort>Meldinger {unreadMessages && `(${unreadMessages.length})`}</BodyShort>
                </PanelTabs.TabSelector>
            </PanelTabs>
            <PanelTabs.TabContent active={tabState === EnumTabState.Invitations}>
                {invitations.candidates ? (
                    <Invitations candidates={invitations.candidates} />
                ) : (
                    <APIHandler loading={invitations.loading} error={invitations.error} />
                )}
            </PanelTabs.TabContent>
            <PanelTabs.TabContent active={tabState === EnumTabState.Messages}>
                {inbox.messages ? (
                    <Inbox messages={inbox.messages} />
                ) : (
                    <APIHandler loading={inbox.loading} error={inbox.error} />
                )}
            </PanelTabs.TabContent>
        </PanelNoBackground>
    );
};
