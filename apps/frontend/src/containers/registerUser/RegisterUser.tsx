import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateRegisterUser } from '../../validation/registerUser';
import { createUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import style from './RegisterUser.module.scss';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';

const defaultUser: IUser = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    latestUpdate: Date.now().toString(),
    criterias: []
};

export const RegisterUser = (): ReactElement => {
    const [user, setUser] = useState<IUser>(defaultUser);
    const [posting, setPosting] = useState(false);
    
    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        if (validateRegisterUser(user).isValid) {
            setPosting(true);
            const { response, isError } = await createUser(user);

            if (response) {
                errorMessageDispatch.clearErrorMessages();
                navigate('/profil');
            } else if (isError && isError.response?.status === 406) {
                errorMessageDispatch.setErrorMessages({
                    nameErrorMsg: errorMessages.nameErrorMsg,
                    emailErrorMsg: validateRegisterUser(user).errorMessages.emailErrorMsg,
                    phoneErrorMsg: errorMessages.phoneErrorMsg
                });
                setPosting(false);
            }
        } else {
            errorMessageDispatch.setErrorMessages(validateRegisterUser(user).errorMessages);
        }
    };

    return (
        <>
            <UserContactInfoForm 
                user={user} 
                handleChange={handleChange}
                errorMessages={errorMessages}
            />
            <UserEditCriterias user={user} setUser={setUser} />
            <Panel>
                <div className={style.submit}>
                    <Button onClick={handleSubmit} loading={posting}>
                        Opprett
                    </Button>
                </div>
            </Panel>
        </>
    );
};
