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
import LandingPage from './containers/landingPage';
import InsightProject, { CreateInsightProject } from './containers/project';
import { InsightProjectOverview } from './containers/project/InsightProjectOverview';
import RegisterUser from './containers/registerUser';
import { UserAdministration } from './containers/userAdministration/UserAdministration';
import UserProfile from './containers/userProfile';
import { ProvideErrorMessageContext } from './core/context/ErrorMessageContext';
import EmployeeLandingPage from './views/employeeLanding/EmployeeLandingPage';

// Root
ReactDOM.render(
    <StrictMode>
        <ProvideErrorMessageContext>
            <HashRouter>
                <Header />
                <Breadcrumbs />
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/hjem" element={<EmployeeLandingPage />} />
                    <Route path="/prosjekt" element={<InsightProjectOverview />} />
                    <Route path="/prosjekt/ny" element={<CreateInsightProject />} />
                    <Route path="/prosjekt/:id" element={<InsightProject />} />
                    <Route path="/prosjekt/:id/innsikt" element={<CreateInsight />} />
                    <Route path="/profil" element={<UserProfile />} />
                    <Route path="/registrer" element={<RegisterUser />} />
                    <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/admin/kriterier" element={<CriteriaAdminPanel />} />
                    <Route path="/admin/brukere" element={<UserAdministration />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </ProvideErrorMessageContext>
    </StrictMode>,
    document.getElementById('root')
);
