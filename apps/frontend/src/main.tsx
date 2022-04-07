import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import App from './app';
import UserProfile from './containers/userProfile';
import CreateInsight from './containers/createInsight/';
import InsightProject, { CreateInsightProject } from './containers/project';
import CriteriaAdminPanel from './containers/criteriaAdministration';
import NotFound from './components/misc/notFound';
import { InsightProjectOverview } from './containers/project/InsightProjectOverview';
import RegisterUser from './containers/registerUser';
import { ProvideErrorMessageContext } from './core/context/ErrorMessageContext';

// Root
ReactDOM.render(
    <StrictMode>
        <ProvideErrorMessageContext>
            <HashRouter>
                {/* <Header />
                <Breadcrumbs /> */}
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/prosjekt" element={<InsightProjectOverview />} />
                    <Route path="/prosjekt/ny" element={<CreateInsightProject />} />
                    <Route path="/prosjekt/:id" element={<InsightProject />} />
                    <Route path="/prosjekt/:id/innsikt" element={<CreateInsight />} />
                    <Route path="/profil" element={<UserProfile />} />
                    <Route path="/registrer" element={<RegisterUser />} />
                    <Route path="/admin/kriterier" element={<CriteriaAdminPanel />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </ProvideErrorMessageContext>
    </StrictMode>,
    document.getElementById('root')
);
