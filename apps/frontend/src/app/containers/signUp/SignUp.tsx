import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Panel, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserEditCriterias } from '.';
import { createUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm } from '../../components/user';

import style from './SignUp.module.scss';

const defaultUser: IUser = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    latestUpdate: Date.now().toString(),
    criterias: []
};

export const SignUp = (): ReactElement => {
    const [user, setUser] = useState<IUser>(defaultUser);
    const [posting, setPosting] = useState(false);

    const navigate = useNavigate();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setPosting(true);
        const { response, isError } = await createUser(user);

        if (response) {
            navigate('/profil');
        } else if (isError) {
            console.error(isError);
        }
    };

    return (
        <>
            <UserContactInfoForm user={user} handleChange={handleChange} />
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
