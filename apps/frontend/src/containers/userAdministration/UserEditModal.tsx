import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Modal, Select } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { updateUser } from '../../api/mutations/mutateUser';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';
import { validateRegisterUser } from '../../validation/registerUser';
import style from './UserAdministration.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditModal = ({ open, close, user, setUser }: IProps): ReactElement => {
    const [patching, setPatching] = useState(false);

    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newUser = { ...user };
        newUser[event.target.id] = event.target.value;
        setUser(newUser);
    };

    const handleSubmit = async () => {
        setPatching(true);

        if (!validateRegisterUser(user).isValid)
            return errorMessageDispatch.setErrorMessages(validateRegisterUser(user).errorMessages);

        const { response, isError } = await updateUser(user);

        if (response) {
            errorMessageDispatch.clearErrorMessages();
            close();
        } else if (isError && isError.response?.status === 406) {
            errorMessageDispatch.setErrorMessages({
                roleErrorMsg: errorMessages.roleErrorMsg
            });
            setPatching(false);
        }
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="medium">Rediger bruker: {user.name}</Heading>
                <Select id="role" label="Rolle" onChange={handleChange} value={user.role}>
                    <option value={EnumUserRole.NAV}>NAV ansatt</option>
                    <option value={EnumUserRole.Admin}>Administrator</option>
                </Select>
                <Button onClick={handleSubmit} loading={patching}>
                    Oppdater
                </Button>
            </Modal.Content>
        </Modal>
    );
};
