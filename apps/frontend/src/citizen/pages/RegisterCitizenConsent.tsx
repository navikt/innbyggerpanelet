import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import React, { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

export const RegisterCitizenConsent = (): ReactElement => {
    
    const location = useLocation();
    const citizen = location.state as ICitizen;


    return (
        <div>heihei</div>
    );
};