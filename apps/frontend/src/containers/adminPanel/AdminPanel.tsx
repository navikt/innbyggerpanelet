import { LinkPanel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PanelNoBackground } from '../../components/misc/panelNoBackground';

export const AdminPanel = (): ReactElement => {
    return (
        <PanelNoBackground>
            <Link to="/admin/kriterier">
                <LinkPanel>
                    <LinkPanel.Title>Administrer kriterier</LinkPanel.Title>
                </LinkPanel>
            </Link>
            <Link to="/admin/brukere">
                <LinkPanel>
                    <LinkPanel.Title>Administrer brukere</LinkPanel.Title>
                </LinkPanel>
            </Link>
        </PanelNoBackground>
    );
};
