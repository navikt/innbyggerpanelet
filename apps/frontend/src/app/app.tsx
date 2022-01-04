import '@navikt/ds-css/index.css';
import { Link } from 'react-router-dom';

export const App = () => {
    return (
        <>
            <Link to="/project">Project</Link>
            <Link to="/Insight">Insight</Link>
        </>
    );
};

export default App;
