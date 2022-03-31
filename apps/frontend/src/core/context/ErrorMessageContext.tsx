import { createContext, ReactElement, useContext, useState } from 'react';
import { IErrorMessage } from '../../validation/IErrorMessage';

export interface IErrorMessageDispatcher {
    setErrorMessages: (errorMessages: IErrorMessage) => void
}

const errorMsgState = {nameErrorMsg: ''};

const errorMessageContext = createContext(errorMsgState);
const errorMessageDispatch = createContext({} as IErrorMessageDispatcher);

function ProvideErrorMessageContext({
    children
}: {
    children: Array<ReactElement> | ReactElement
}): ReactElement {

    const [state, setState] = useState<IErrorMessage>({...errorMsgState});

    const dispatcher: IErrorMessageDispatcher = {
        setErrorMessages: (errorMessages: IErrorMessage) => {
            setState(errorMessages);
        }
    };

    return (
        <errorMessageContext.Provider value={state}>
            <errorMessageDispatch.Provider value={dispatcher}>{children}</errorMessageDispatch.Provider>
        </errorMessageContext.Provider>
    );
}

const useErrorMessageState = (): IErrorMessage => {
    return useContext(errorMessageContext);
};

const useErrorMessageDispatcher = (): IErrorMessageDispatcher => {
    return useContext(errorMessageDispatch);
};

export { ProvideErrorMessageContext, useErrorMessageState, useErrorMessageDispatcher };