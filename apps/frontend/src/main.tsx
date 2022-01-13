import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import CandidateProfile from './app/containers/candidateProfile/CandidateProfile';
import { CreateInsight } from './app/containers/createInsight/CreateInsight';
import { Project } from './app/containers/project';

// Root
ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/project" element={<Project />} />
                <Route path="/insight" element={<CreateInsight />} />
                <Route path="/profile" element={<p>Profile here</p>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
