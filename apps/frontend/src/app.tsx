import '@navikt/ds-css/index.css';
import { Panel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';
import style from './app.module.scss';
import { InsightProjectOverview } from './containers/project/InsightProjectOverview';

export const App = () => {
    return (
        <>
            <Panel>
                <div className={style.links}>
                    <Link to="/prosjekt/ny">Nytt prosjekt</Link>
                    <Link to="/profil">Brukerprofil</Link>
                    <Link to="/registrer">Registrer bruker</Link>
                    <Link to="/admin/kriterier">Kriterier oversikt</Link>
                    <Link to="/ansatt">Ansatt hjem</Link>
                </div>
            </Panel>
            <InsightProjectOverview />   
        </>
    );
};

export default App;
