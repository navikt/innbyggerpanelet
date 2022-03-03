import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Panel, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import isEmail from '../../../validation/utils/isEmail';
import style from './RegisterUser.module.scss';
import isNorwegianPhoneNumber from '../../../validation/utils/isNorwegainPhoneNumber';

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
    
    const [isContactFormValid, setIsContactFormValid] = useState<boolean>(false);
    const [nameErrorMsg, setNameErrorMsg] = useState<string>('');
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>('');
    const [phoneErrorMsg, setPhoneErrorMsg] = useState<string>('');

    const navigate = useNavigate();

    const validateContactInfoForm = () => {
        if (user.name !== '' && isEmail(user.email) && isNorwegianPhoneNumber(user.phone)) {
            setNameErrorMsg('');
            setEmailErrorMsg('');
            setPhoneErrorMsg('');
            setIsContactFormValid(true);
        } else {
            if (user.name === '') {
                setNameErrorMsg('Du må gi brukeren et navn');
            }
            if (!isEmail(user.email)) {
                setEmailErrorMsg('Eposten er ikke på riktig format');
            }
            if (!isNorwegianPhoneNumber(user.phone)) {
                setPhoneErrorMsg('Telefonnummeret er ikke på riktig format');
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        validateContactInfoForm();

        if (isContactFormValid) {
            setPosting(true);
            const { response, isError } = await createUser(user);

            if (response) {
                navigate('/profil');
            } else if (isError) {
                if (isError.response?.status === 406) {
                    setEmailErrorMsg('En bruker med denne eposten finnes allerede');
                    setPosting(false);
                }
            }
        }
    };

    return (
        <>
            <UserContactInfoForm 
                user={user} 
                handleChange={handleChange}
                nameErrorMsg={nameErrorMsg}
                emailErrorMsg={emailErrorMsg}
                phoneErrorMsg={phoneErrorMsg}
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
