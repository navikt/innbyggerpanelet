import React, { useEffect, useState } from 'react';
import { CreateInsight } from './containers/createInsight/CreateInsight';
import '@navikt/ds-css/index.css';

export const App = () => {
    return (
        <>
            <CreateInsight name="Hello" />
        </>
    );
};

export default App;
