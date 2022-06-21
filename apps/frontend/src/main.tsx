import '@navikt/ds-css/index.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/misc/breadcrumbs';
import Header from './components/misc/header';
import NotFound from './components/misc/notFound';
import AdminPanel from './containers/adminPanel';
import CriteriaAdminPanel from './containers/criteriaAdministration';
import { EmployeeAdministration } from './containers/employeeAdministration/EmployeeAdministration';
import LandingPage from './containers/landingPage';
import RegisterCitizen from './containers/registerCitizen';
import UserProfile from './containers/userProfile';
import employeeRoutes from './employee/routes';
import { MessagesPage } from './views/messages/MessagesPage';
import { SignInPage } from './views/signInPage/SignInPage';

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
                <Route path="/profil" element={<UserProfile />} />
                <Route path="/registrer" element={<RegisterCitizen />} />
                <Route path="/meldinger" element={<MessagesPage />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="/admin/kriterier" element={<CriteriaAdminPanel />} />
                <Route path="/admin/brukere" element={<EmployeeAdministration />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
);
