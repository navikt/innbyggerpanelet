import { IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Edit } from '@navikt/ds-icons';
import { Heading, Panel, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { mutate } from 'swr';
import { useTeamMemberByName } from '../../api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { EmployeeEditModal } from '../containers';
import style from './pages.module.scss';

export const EmployeeAdministration = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [employee, setEmployee] = useState<IEmployee>();

    const { employees, loading, error } = useTeamMemberByName(name);

    const handleName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleModalClose = () => {
        mutate(`/api/employee/teamMember?name=%${name}%`); // Will not refresh component if reponse code is 404. Keeps old results in cache.
        setEmployee(undefined);
    };

    return (
        <>
            <Panel>
                <Heading size="large">Brukere og deres roller i innbyggerpanelet</Heading>
                <div className={style.filter}>
                    <TextField label="Navn" value={name} onChange={handleName} />
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
                        {employees?.map((employee, index) => (
                            <Table.Row key={index}>
                                <Table.DataCell>{employee.firstname + ' ' + employee.surname}</Table.DataCell>
                                <Table.DataCell>{employee.role}</Table.DataCell>
                                <Table.DataCell>
                                    <Edit className={style.edit} onClick={() => setEmployee(employee)} />
                                </Table.DataCell>
                            </Table.Row>
                        )) || <APIHandler error={error} loading={loading} />}
                    </Table.Body>
                </Table>
            </Panel>
            {!employee || (
                <EmployeeEditModal
                    open={employee !== undefined}
                    close={handleModalClose}
                    employee={employee}
                    setEmployee={setEmployee}
                />
            )}
        </>
    );
};
