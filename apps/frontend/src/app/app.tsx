import '@navikt/ds-css/index.css';
import { Link } from 'react-router-dom';

export const App = () => {
    return (
        <>
            <Link to="/project">Project</Link>
            <Link to="/insight">Insight</Link>
            <Link to="/profile">Profile</Link>
        </>
    );
};

export default App;
