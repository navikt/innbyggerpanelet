import '@navikt/ds-css/index.css';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Breadcrumbs from './components/misc/breadcrumbs';
import Header from './components/misc/header';
import NotFound from './components/misc/notFound';
import AdminPanel from './containers/adminPanel';
import CreateInsight from './containers/createInsight/';
import CriteriaAdminPanel from './containers/criteriaAdministration';
import { EmployeeAdministration } from './containers/employeeAdministration/EmployeeAdministration';
import LandingPage from './containers/landingPage';
import InsightProject, { CreateInsightProject } from './containers/project';
import { InsightProjectOverview } from './containers/project/InsightProjectOverview';
import RegisterCitizen from './containers/registerCitizen';
import UserProfile from './containers/userProfile';
import EmployeeLandingPage from './views/employeeLanding/EmployeeLandingPage';
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
                <Route path="/hjem" element={<EmployeeLandingPage />} />
                <Route path="/prosjekt" element={<InsightProjectOverview />} />
                <Route path="/prosjekt/ny" element={<CreateInsightProject />} />
                <Route path="/prosjekt/:id" element={<InsightProject />} />
                <Route path="/prosjekt/:id/innsikt" element={<CreateInsight />} />
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
