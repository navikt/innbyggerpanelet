import '@navikt/ds-css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/header/Header'
import { LandingPage } from './pages/landingPage/LandingPage'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter basename={process.env.BASE_PATH}>
            <Header />
            <Routes>
                <Route path="/" element={<LandingPage />}/>
            </Routes>
        </HashRouter>
    </React.StrictMode>
)
