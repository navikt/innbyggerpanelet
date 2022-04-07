import '@navikt/ds-css/index.css';

import EmployeeLandingPage from './views/employeeLanding/EmployeeLandingPage';

export const App = () => {
    return (
        <>
            {/* <Panel>
                <div className={style.links}>
                    <Link to="/prosjekt/ny">Nytt prosjekt</Link>
                    <Link to="/profil">Brukerprofil</Link>
                    <Link to="/registrer">Registrer bruker</Link>
                    <Link to="/admin/kriterier">Kriterier oversikt</Link>
                </div>
            </Panel>
            <InsightProjectOverview /> */}
            <EmployeeLandingPage />
        </>
    );
};

export default App;
