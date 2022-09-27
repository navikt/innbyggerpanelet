import React from 'react'
import './styles.scss'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/common/header/Header'
import '@navikt/ds-css/index.css'
import { Breadcrumbs } from './components/common/breadcrumbs/Breadcrumbs'
import { EmployeeLandingPage } from './pages/employeeLanding/EmployeeLandingPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter basename={process.env.BASE_PATH}>
            <Header />
            <Breadcrumbs />
            <Routes>
                <Route path="/" element={<EmployeeLandingPage />} />
            </Routes>
        </HashRouter>
    </React.StrictMode>
)