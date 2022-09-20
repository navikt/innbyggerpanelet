import './styles.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '@navikt/ds-css/index.css'
import { Header } from './components/header/Header'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <HashRouter basename={process.env.BASE_PATH}>
            <Header />
        </HashRouter>
    </React.StrictMode>
)
