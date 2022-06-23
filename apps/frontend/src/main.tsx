import '@navikt/ds-css/index.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import adminRoutes from './admin/routes';
import citizenRoutes from './citizen/routes';
import Breadcrumbs from './common/components/breadcrumbs';
import Header from './common/components/header';
import NotFound from './common/components/notFound';
import { LandingPage } from './common/pages/landingPage';
import { SignInPage } from './common/pages/signInPage';
import employeeRoutes from './employee/routes';
import messageRoutes from './message/routes';

// Root
ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Header />
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/innlogging" element={<SignInPage />} />
                <Route path="/ansatt">{employeeRoutes()}</Route>
                <Route path="/admin">{adminRoutes()}</Route>
                <Route path="/innbygger">{citizenRoutes()}</Route>
                <Route path="/meldinger">{messageRoutes()}</Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
);
