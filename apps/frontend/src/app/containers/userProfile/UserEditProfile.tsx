import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';

import style from './UserProfile.module.scss';

interface IProps {
    originalUser: IUser;
    toggleEdit: () => void;
}

export const UserEditProfile = ({ originalUser, toggleEdit }: IProps): ReactElement => {
    const [user, setUser] = useState<IUser>(originalUser);
    const [patching, setPatching] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        return 0;
    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleEdit();
    };

    return (
        <>
            <UserContactInfoForm user={user} handleChange={handleChange} />
            <UserEditCriterias user={user} setUser={setUser} />
            <Panel>
                <div className={style.buttons}>
                    <Button onClick={handleSubmit} loading={patching}>
                        Oppdater
                    </Button>
                    <Button variant="danger" onClick={handleCancel} loading={patching}>
                        Avbryt
                    </Button>
                </div>
            </Panel>
        </>
    );
};
