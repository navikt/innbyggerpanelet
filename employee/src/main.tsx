import React from 'react'
import './styles.scss'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/common/header/Header'
import '@navikt/ds-css/index.css'
import { Breadcrumbs } from './components/common/breadcrumbs/Breadcrumbs'
import { EmployeeLandingPage } from './pages/employeeLanding/EmployeeLandingPage'
import { EmployeeInsightCreationPage } from './pages/employeeInsightCreationPage/EmployeeInsightCreationPage'
import { EmployeeInsightProjectDetailPage } from './pages/EmployeeInsightProjectDetailPage'
import { EmployeeInsightProjectCreationPage } from './pages/EmployeeInsightProjectCreationPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter>
            <Header />
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<EmployeeLandingPage />} />
                <Route path="/prosjekt/ny" element={<EmployeeInsightProjectCreationPage />} />
                <Route path="/prosjekt/:id" element={<EmployeeInsightProjectDetailPage />} />
                <Route path="/prosjekt/:id/innsikt" element={<EmployeeInsightCreationPage />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
