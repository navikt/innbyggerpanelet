import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Panel, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import isEmail from '../../../validation/utils/isEmail';
import style from './RegisterUser.module.scss';
import isNorwegianPhoneNumber from '../../../validation/utils/isNorwegainPhoneNumber';
import { IRegisterUserErrors } from '../../../validation/registerUser/IRegisterUserErrors';
import { validateRegisterUser } from '../../../validation/registerUser/validateRegisterUser';

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
    
    const [errorMessages, setErrorMessages] = useState<IRegisterUserErrors>(
        {
            nameErrorMsg: '',
            emailErrorMsg: '',
            phoneErrorMsg: ''
        }
    );

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
                navigate('/profil');
            } else if (isError) {
                if (isError.response?.status === 406) {
                    setErrorMessages({
                        nameErrorMsg: errorMessages.nameErrorMsg,
                        emailErrorMsg: 'En bruker med denne eposten finnes allerede',
                        phoneErrorMsg: errorMessages.phoneErrorMsg
                    });
                    setPosting(false);
                }
            }
        } else {
            setErrorMessages(validateRegisterUser(user).errorMessages);
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
