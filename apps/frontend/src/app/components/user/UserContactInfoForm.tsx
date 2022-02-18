import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Panel, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';

import style from './UserContactInfoForm.module.scss';

interface IProps {
    user: IUser;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const UserContactInfoForm = ({ user, handleChange }: IProps): ReactElement => {
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
            <TextField label="E-Post" id="email" name="email" value={email} onChange={handleChange} />
            <TextField label="Telefonnummer" id="phone" name="phone" value={phone} onChange={handleChange} />
        </Panel>
    );
};
