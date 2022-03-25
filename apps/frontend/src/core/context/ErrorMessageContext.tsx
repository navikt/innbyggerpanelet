import { createContext, ReactElement, useState } from 'react';
import { errorMessageState } from './errorMessageState';

const errorMessageContext = createContext(errorMessageState);

function ProvideErrorMessageContext({
    children
}: {
    children: Array<ReactElement> | ReactElement
}): ReactElement {

    const [state, setState] = useState({...errorMessageState});

    return (
        <errorMessageContext.Provider value={state}>
            {children}
        </errorMessageContext.Provider>
    );
}