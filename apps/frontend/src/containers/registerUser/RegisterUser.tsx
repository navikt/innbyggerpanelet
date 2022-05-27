import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import { useValidationErrors } from '../../core/hooks/useValidationErrors';
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
    const [userValidationErrors, setUserValidationErrors] = useValidationErrors();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const { response, error, validationErrors } = await createUser(user);
        if (error) throw new Error('Failed to post user');
        if (validationErrors) return setUserValidationErrors(validationErrors);
        if (response) navigate('/profil');
    };

    return (
        <>
            <UserContactInfoForm user={user} handleChange={handleChange} validationErrors={userValidationErrors} />
            <UserEditCriterias user={user} setUser={setUser} validationErrors={userValidationErrors} />
            <Panel>
                <div className={style.submit}>
                    <Button onClick={handleSubmit}>Opprett</Button>
                </div>
            </Panel>
        </>
    );
};
