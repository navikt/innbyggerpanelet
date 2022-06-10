import { ReactElement } from 'react';
import { useCandidatesByCurrentUser } from '../../api/hooks';
import { APIHandler } from '../../components/misc/apiHandler';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';
import { Inbox } from '../../containers/messages/Inbox';

export const MessagesPage = (): ReactElement => {
    const { candidates, loading, error } = useCandidatesByCurrentUser();

    return (
        <PanelNoBackground>
            {candidates ? <Inbox candidates={candidates} /> : <APIHandler loading={loading} error={error} />}
        </PanelNoBackground>
    );
};
