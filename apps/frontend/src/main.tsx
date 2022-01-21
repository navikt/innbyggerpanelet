import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import UserProfile from './app/containers/userProfile';
import CreateInsight from './app/containers/createInsight/';
import Project from './app/containers/project';
import CriteriaAdminPanel from './app/containers/criteriaAdministration';
import Header from './app/components/misc/header';
import Breadcrumbs from './app/components/misc/breadcrumbs/';

// Root
ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Header />
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/prosjekt" element={<Project />} />
                <Route path="/innsikt" element={<CreateInsight />} />
                <Route path="/profil" element={<UserProfile />} />
                <Route
                    path="/admin/kriterier"
                    element={<CriteriaAdminPanel />}
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
