import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Panel } from '@navikt/ds-react';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { updateUser } from '../../api/mutations/mutateUser';
import { UserContactInfoForm, UserEditCriterias } from '../../components/user';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';
import { validateRegisterUser } from '../../validation/registerUser';
import style from './UserProfile.module.scss';

interface IProps {
    originalUser: IUser;
    toggleEdit: () => void;
}

export const UserEditProfile = ({ originalUser, toggleEdit }: IProps): ReactElement => {
    const [user, setUser] = useState<IUser>(originalUser);
    const [patching, setPatching] = useState(false);
    
    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...user };
        result[event.target.id] = event.target.value;
        setUser(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (validateRegisterUser(user).isValid) {
            setPatching(true);
            const { response, isError } = await updateUser({ ...user, latestUpdate: Date.now().toString() });
            if (response) {
                toggleEdit();
            } else if (isError?.response?.status === 406) {
                errorMessageDispatch.setErrorMessages({
                    nameErrorMsg: errorMessages.nameErrorMsg,
                    emailErrorMsg: validateRegisterUser(user).errorMessages.emailErrorMsg,
                    phoneErrorMsg: errorMessages.phoneErrorMsg
                });
                // setErrorMessages({
                //     nameErrorMsg: errorMessages.otherErrorMessages?.nameErrorMsg,
                //     emailErrorMsg: 'En bruker med denne eposten finnes allerede',
                //     phoneErrorMsg: errorMessages.otherErrorMessages?.phoneErrorMsg
                // });
                setPatching(false);
            }
        } else {
            errorMessageDispatch.setErrorMessages(validateRegisterUser(user).errorMessages);
        }


    };

    const handleCancel = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        toggleEdit();
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
