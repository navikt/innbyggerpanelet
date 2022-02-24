import { useState } from 'react';

// TEMP: Maybe move this to api-library
interface IToken {
    token: string;
}

export const useToken = () => {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        return tokenString ? JSON.parse(tokenString) : null;
    };

    const [token, setToken] = useState<IToken>(getToken());

    const saveToken = (userToken: IToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    return {
        token,
        setToken: saveToken
    };
};
