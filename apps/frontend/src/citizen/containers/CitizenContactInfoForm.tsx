import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Heading, Panel, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';
import { IValidationError } from '../../core/hooks/useFormatValidationErrors';
import style from './containers.module.scss';

interface IProps {
    citizen: ICitizen;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    validationErrors: IValidationError;
}

export const CitizenContactInfoForm = ({ citizen, handleChange, validationErrors }: IProps): ReactElement => {
    const { firstname, surname, phone, expirationDate } = citizen;

    return (
        <Panel className={style.contactInfo}>
            <Heading size="large">Kontaktinformasjon</Heading>
            <TextField
                label="Fornavn"
                id="firstname"
                name="firstname"
                value={firstname || ''}
                onChange={handleChange}
                error={validationErrors.firstname}
            />
            <TextField
                label="Etternavn"
                id="surname"
                name="surname"
                value={surname || ''}
                onChange={handleChange}
                error={validationErrors.surname}
            />
            <TextField
                label="Telefonnummer"
                id="phone"
                name="phone"
                value={phone || ''}
                onChange={handleChange}
                error={validationErrors.phone}
            />
            <TextField
                label="Utløpsdato"
                id="expirationDate"
                name="expirationDate"
                disabled={true}
                value={expirationDate}
                error={validationErrors.expirationDate}
            />
        </Panel>
    );
};
