import { LinkPanel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { PanelNoBackground } from '../../common/components/panelNoBackground';

export const AdminPanel = (): ReactElement => {
    return (
        <PanelNoBackground>
            <Link to="/admin/kriterier">
                <LinkPanel as="div">
                    <LinkPanel.Title>Administrer kriterier</LinkPanel.Title>
                </LinkPanel>
            </Link>
            <Link to="/admin/ansatte">
                <LinkPanel as="div">
                    <LinkPanel.Title>Administrer brukere</LinkPanel.Title>
                </LinkPanel>
            </Link>
            <Link to="/admin/samtykker">
                <LinkPanel as="div">
                    <LinkPanel.Title>Administrer samtykkemaler</LinkPanel.Title>
                </LinkPanel>
            </Link>
        </PanelNoBackground>
    );
};
