import React from 'react';
import { CreateInsight } from './containers/createInsight/CreateInsight';
import '@navikt/ds-css/index.css';
import { CriteriaAdminPanel } from './containers/criteriaAdministration';

export const App = () => {
    return <CriteriaAdminPanel />;
};

export default App;
