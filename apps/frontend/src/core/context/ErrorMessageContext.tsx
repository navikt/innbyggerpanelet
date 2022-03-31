import { createContext, ReactElement, useContext, useState } from 'react';
import { errorMessageState, errorMessageTypes, IErrorMessages } from './errorMessageState';

export interface IErrorMessageDispatcher {
    setErrorMessages: (errorMessages: IErrorMessages<errorMessageTypes>) => void
}

const errorMessageContext = createContext(errorMessageState);
const errorMessageDispatch = createContext({} as IErrorMessageDispatcher);

function ProvideErrorMessageContext({
    children
}: {
    children: Array<ReactElement> | ReactElement
}): ReactElement {

    const [state, setState] = useState({...errorMessageState});

    const dispatcher: IErrorMessageDispatcher = {
        setErrorMessages: (errorMessages: IErrorMessages<errorMessageTypes>) => {
            setState(errorMessages);
        }
    };

    return (
        <errorMessageContext.Provider value={state}>
            <errorMessageDispatch.Provider value={dispatcher}>{children}</errorMessageDispatch.Provider>
        </errorMessageContext.Provider>
    );
}

const useErrorMessageState = (): IErrorMessages<errorMessageTypes> => {
    return useContext(errorMessageContext);
};

const useErrorMessageDispatcher = (): IErrorMessageDispatcher => {
    return useContext(errorMessageDispatch);
};

export {ProvideErrorMessageContext, useErrorMessageState, useErrorMessageDispatcher };