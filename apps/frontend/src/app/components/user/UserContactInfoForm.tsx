import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Panel, TextField } from '@navikt/ds-react';
import { ChangeEvent, Dispatch, ReactElement, SetStateAction, useState } from 'react';
import isEmail from '../../utils/validations/isEmail';
import isNorwegianPhoneNumber from '../../utils/validations/isNorwegainPhoneNumber';

import style from './UserContactInfoForm.module.scss';

interface IProps {
    user: IUser;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    emailErrorMsg: string;
    phoneErrorMsg: string;
}

export const UserContactInfoForm = ({ user, handleChange, emailErrorMsg, phoneErrorMsg}: IProps): ReactElement => {
    const { name, email, phone } = user;

    return (
        <Panel className={style.contactInfo}>
            <Heading size="large">Kontaktinformasjon</Heading>
            <TextField
                className={style.contactName}
                label="Navn"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
            />
            <TextField 
                label="E-Post" 
                id="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                error={emailErrorMsg}
            />
            <TextField 
                label="Telefonnummer" 
                id="phone" 
                name="phone" 
                value={phone} 
                onChange={handleChange}
                error={phoneErrorMsg} 
            />
        </Panel>
    );
};
