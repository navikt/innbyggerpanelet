import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Modal, Select } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';
import { updateUser } from '../../api/mutations/mutateUser';
import { useValidationErrors } from '../../core/hooks/useValidationErrors';
import style from './UserAdministration.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditModal = ({ open, close, user, setUser }: IProps): ReactElement => {
    const [userValidationErrors, setUserValidationErrors] = useValidationErrors();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newUser = { ...user };
        newUser[event.target.id] = event.target.value;
        setUser(newUser);
    };

    const handleSubmit = async () => {
        const { response, error, validationErrors } = await updateUser(user);
        if (error) throw new Error('Failed to PUT user.');
        if (validationErrors) return setUserValidationErrors(validationErrors);
        if (response) close();
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="medium">Rediger bruker: {user.name}</Heading>
                <Select
                    id="role"
                    label="Rolle"
                    onChange={handleChange}
                    value={user.role}
                    error={userValidationErrors.role}
                >
                    <option value={EnumUserRole.NAV}>NAV ansatt</option>
                    <option value={EnumUserRole.Admin}>Administrator</option>
                </Select>
                <Button onClick={handleSubmit}>Oppdater</Button>
            </Modal.Content>
        </Modal>
    );
};
