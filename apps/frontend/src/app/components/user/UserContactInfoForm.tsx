import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Panel, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';
import { IRegisterUserErrors } from '../../../validation/registerUser';
import style from './UserContactInfoForm.module.scss';


interface IProps {
    user: IUser;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    errorMessages: IRegisterUserErrors
}

export const UserContactInfoForm = ({ 
    user, 
    handleChange,
    errorMessages
}: IProps): ReactElement => {
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
                error={errorMessages.nameErrorMsg}
            />
            <TextField 
                label="E-Post" 
                id="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                error={errorMessages.emailErrorMsg}
            />
            <TextField 
                label="Telefonnummer" 
                id="phone" 
                name="phone" 
                value={phone} 
                onChange={handleChange}
                error={errorMessages.phoneErrorMsg} 
            />
        </Panel>
    );
};
