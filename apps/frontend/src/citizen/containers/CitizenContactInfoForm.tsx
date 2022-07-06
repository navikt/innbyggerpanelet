import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Refresh } from '@navikt/ds-icons';
import { Button, Heading, Panel, TextField } from '@navikt/ds-react';
import { add } from 'date-fns/esm';
import { ChangeEvent, ReactElement } from 'react';
import { IValidationError } from '../../common/hooks';
import style from './CitizenContactInfoForm.module.scss';

interface IProps {
    citizen: ICitizen;
    setCitizen: (citizen: ICitizen) => void;
    validationErrors: IValidationError;
}

export const CitizenContactInfoForm = ({ citizen, setCitizen, validationErrors }: IProps): ReactElement => {
    const { firstname, surname, phone, expirationDate } = citizen;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...citizen };
        result[event.target.id] = event.target.value;
        setCitizen(result);
    };

    const handleExtendDate = () => {
        const newDate = add(new Date(), { years: 1 }).toISOString().slice(0, 10);

        setCitizen({ ...citizen, expirationDate: newDate });
    };

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
            <div className={style.expiration}>
                <TextField
                    label="Utløpsdato"
                    id="expirationDate"
                    name="expirationDate"
                    disabled={true}
                    value={expirationDate}
                    error={validationErrors.expirationDate}
                />
                <Button onClick={handleExtendDate}>
                    <Refresh />
                </Button>
            </div>
        </Panel>
    );
};
