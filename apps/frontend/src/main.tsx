import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './app/app';
import { CreateInsight } from './app/containers/createInsight/CreateInsight';
import { Project } from './app/containers/project/Project';

// Root
ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/project" element={<Project />} />
                <Route path="/insight" element={<CreateInsight />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
);
