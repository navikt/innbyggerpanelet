import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { updateCitizen } from '../../api/mutations/mutateCitizen';
import { CitizenContactInfoForm, UserEditCriterias } from '../../components/citizen';
import { APIHandler } from '../../components/misc/apiHandler';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import style from './UserProfile.module.scss';

interface IProps {
    originalCitizen: ICitizen;
    toggleEdit: () => void;
}

export const CitizenEditProfile = ({ originalCitizen, toggleEdit }: IProps): ReactElement => {
    const [citizen, setCitizen] = useState<ICitizen>(originalCitizen);
    const [citizenValidationErrors, setCitizenValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...citizen };
        result[event.target.id] = event.target.value;
        setCitizen(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await updateCitizen(citizen);
        if (error) return setPutError(error);
        if (validationErrors) return setCitizenValidationErrors(validationErrors);
        if (response) toggleEdit();
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleEdit();
    };

    return (
        <>
            <CitizenContactInfoForm
                citizen={citizen}
                handleChange={handleChange}
                validationErrors={citizenValidationErrors}
            />
            <UserEditCriterias citizen={citizen} setCitizen={setCitizen} validationErrors={citizenValidationErrors} />
            <Panel>
                {putError && <APIHandler loading={false} error={putError} />}
                <div className={style.buttons}>
                    <Button onClick={handleSubmit}>Oppdater</Button>
                    <Button variant="danger" onClick={handleCancel}>
                        Avbryt
                    </Button>
                </div>
            </Panel>
        </>
    );
};
