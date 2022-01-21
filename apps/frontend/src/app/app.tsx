import '@navikt/ds-css/index.css';
import { Panel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

import style from './app.module.scss';

export const App = () => {
    return (
        <Panel>
            <div className={style.links}>
                <Link to="/prosjekt">Prosjekt</Link>
                <Link to="/innsikt">Nytt innsiktsarbeid</Link>
                <Link to="/profil">Brukerprofil</Link>
                <Link to="/admin/kriterier">Kriterier oversikt</Link>
            </div>
        </Panel>
    );
};

export default App;
