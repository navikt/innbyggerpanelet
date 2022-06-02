import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { updateUser } from '../../api/mutations/mutateUser';
import { APIHandler } from '../../components/misc/apiHandler';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import style from './UserProfile.module.scss';

interface IProps {
    originalUser: IUser;
    toggleEdit: () => void;
}

export const UserEditProfile = ({ originalUser, toggleEdit }: IProps): ReactElement => {
    const [user, setUser] = useState<IUser>(originalUser);
    const [userValidationErrors, setUserValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await updateUser(user);
        if (error) return setPutError(error);
        if (validationErrors) return setUserValidationErrors(validationErrors);
        if (response) toggleEdit();
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleEdit();
    };

    return (
        <>
            <UserContactInfoForm user={user} handleChange={handleChange} validationErrors={userValidationErrors} />
            <UserEditCriterias user={user} setUser={setUser} validationErrors={userValidationErrors} />
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
