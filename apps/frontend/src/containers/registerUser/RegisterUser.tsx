import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/mutations/mutateUser';
import { APIHandler } from '../../components/misc/apiHandler';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import { useFormatValidationErrors } from '../../core/hooks/useFormatValidationErrors';
import style from './RegisterUser.module.scss';

const defaultUser: IUser = {
    id: '0',
    name: '',
    email: '',
    phone: '',
    role: EnumUserRole.Citizen,
    latestUpdate: Date.now().toString(),
    criterias: []
};

export const RegisterUser = (): ReactElement => {
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>(defaultUser);
    const [userValidationErrors, setUserValidationErrors] = useFormatValidationErrors();
    const [postError, setPostError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await createUser(user);
        if (error) return setPostError(error);
        if (validationErrors) return setUserValidationErrors(validationErrors);
        if (response) navigate('/profil');
    };

    return (
        <>
            <UserContactInfoForm user={user} handleChange={handleChange} validationErrors={userValidationErrors} />
            <UserEditCriterias user={user} setUser={setUser} validationErrors={userValidationErrors} />
            <Panel>
                {postError && <APIHandler loading={false} error={postError} />}

                <div className={style.submit}>
                    <Button onClick={handleSubmit}>Opprett</Button>
                </div>
            </Panel>
        </>
    );
};
