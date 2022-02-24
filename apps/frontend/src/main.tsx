import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import UserProfile from './app/containers/userProfile';
import CreateInsight from './app/containers/createInsight/';
import InsightProject, { InsightProjectNew } from './app/containers/project';
import CriteriaAdminPanel from './app/containers/criteriaAdministration';
import Header from './app/components/misc/header';
import Breadcrumbs from './app/components/misc/breadcrumbs/';
import NotFound from './app/components/misc/notFound';
import { InsightProjectOverview } from './app/containers/project/InsightProjectOverview';

// Root
ReactDOM.render(
    <StrictMode>
        <HashRouter>
            <Header />
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/prosjekt" element={<InsightProjectOverview />} />
                <Route path="/prosjekt/ny" element={<InsightProjectNew />} />
                <Route path="/prosjekt/:id" element={<InsightProject />} />
                <Route
                    path="/prosjekt/:id/innsikt"
                    element={<CreateInsight />}
                />
                <Route path="/profil" element={<UserProfile />} />
                <Route
                    path="/admin/kriterier"
                    element={<CriteriaAdminPanel />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </HashRouter>
    </StrictMode>,
    document.getElementById('root')
);
