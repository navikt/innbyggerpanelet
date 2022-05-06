import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Modal, Select } from '@navikt/ds-react';
import { ChangeEvent, ReactElement } from 'react';

interface IProps {
    open: boolean;
    close: () => void;
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditModal = ({ open, close, user, setUser }: IProps): ReactElement => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newUser = { ...user };
        newUser[event.target.id] = event.target.value;
        setUser(newUser);
    };

    //const handleSubmit = () => {};

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content>
                <Heading size="medium">Rediger bruker</Heading>
                <Select id="role" label="Rolle" onChange={handleChange} value={user.role}>
                    <option value={EnumUserRole.NAV}>NAV ansatt</option>
                    <option value={EnumUserRole.Admin}>Administrator</option>
                </Select>
            </Modal.Content>
        </Modal>
    );
};
