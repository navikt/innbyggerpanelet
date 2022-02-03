import '@navikt/ds-css/index.css';
import { Panel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

import style from './app.module.scss';
import { PanelNoBackground } from './components/misc/panelNoBackground';
import { InsightProjectOverview } from './containers/project/InsightProjectOverview';

export const App = () => {
    return (
        <>
            <Panel>
                <div className={style.links}>
                    <Link to="/innsikt">Nytt innsiktsarbeid</Link>
                    <Link to="/profil">Brukerprofil</Link>
                    <Link to="/admin/kriterier">Kriterier oversikt</Link>
                </div>
            </Panel>
            <InsightProjectOverview />
        </>
    );
};

export default App;
