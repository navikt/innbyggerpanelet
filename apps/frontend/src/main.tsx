import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import UserProfile from './app/containers/userProfile';
import CreateInsight from './app/containers/createInsight/';
import Project from './app/containers/project';
import CriteriaAdminPanel from './app/containers/criteriaAdministration';

// Root
ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/project" element={<Project />} />
                <Route path="/insight" element={<CreateInsight />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route
                    path="/admin/criterias"
                    element={<CriteriaAdminPanel />}
                />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
