import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Edit } from '@navikt/ds-icons';
import { Heading, Panel, Select, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { mutate } from 'swr';
import { useUsersByNameAndRole } from '../../api/hooks';
import { APIHandler } from '../../components/misc/apiHandler';
import style from './UserAdministration.module.scss';
import { UserEditModal } from './UserEditModal';

export const UserAdministration = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<EnumUserRole>(EnumUserRole.NAV);
    const [user, setUser] = useState<IUser>();

    const { users, loading, error } = useUsersByNameAndRole(name, role);

    const handleName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleRole = (event: ChangeEvent<HTMLSelectElement>) => setRole(event.target.value as EnumUserRole);
    const handleModalClose = () => {
        mutate(`/api/user?where[name]=%${name}%&where[role]=${role}`); // Will not refresh component if reponse code is 404. Keeps old results in cache.
        setUser(undefined);
    };

    return (
        <>
            <Panel>
                <Heading size="large">Brukere og deres roller i innbyggerpanelet</Heading>
                <div className={style.filter}>
                    <TextField label="Navn" value={name} onChange={handleName} />
                    <Select label="Rolle" onChange={handleRole} value={role}>
                        <option value={EnumUserRole.NAV}>NAV ansatt</option>
                        <option value={EnumUserRole.Admin}>Administrator</option>
                    </Select>
                </div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Navn</Table.HeaderCell>
                            <Table.HeaderCell>Rolle</Table.HeaderCell>
                            <Table.HeaderCell>Rediger</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {users?.map((user, index) => (
                            <Table.Row key={index}>
                                <Table.DataCell>{user.name}</Table.DataCell>
                                <Table.DataCell>{user.role}</Table.DataCell>
                                <Table.DataCell>
                                    <Edit className={style.edit} onClick={() => setUser(user)} />
                                </Table.DataCell>
                            </Table.Row>
                        )) || <APIHandler error={error} loading={loading} />}
                    </Table.Body>
                </Table>
            </Panel>
            {!user || (
                <UserEditModal open={user !== undefined} close={handleModalClose} user={user} setUser={setUser} />
            )}
        </>
    );
};
