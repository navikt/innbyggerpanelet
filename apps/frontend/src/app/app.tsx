import '@navikt/ds-css/index.css';
import { Panel } from '@navikt/ds-react';
import { Link } from 'react-router-dom';

import style from './app.module.scss';

export const App = () => {
    return (
        <Panel>
            <div className={style.links}>
                <Link to="/project">Project</Link>
                <Link to="/insight">Insight</Link>
                <Link to="/profile">Profile</Link>
                <Link to="/admin/criterias">Criteria Admin Panel</Link>
            </div>
        </Panel>
    );
};

export default App;
