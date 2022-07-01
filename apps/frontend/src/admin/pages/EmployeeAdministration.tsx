import { IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Edit } from '@navikt/ds-icons';
import { Heading, Panel, Search, Table } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { mutate } from 'swr';
import { useTeamMemberByName } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { EmployeeEditModal } from '../containers';
import style from './EmployeeAdministration.module.scss';

export const EmployeeAdministration = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [employee, setEmployee] = useState<IEmployee>();

    const { employees, loading, error } = useTeamMemberByName(name);

    const handleName = (input: string) => setName(input);
    const handleModalClose = () => {
        mutate(`/api/employee/teamMember?name=%${name}%`); // Will not refresh component if reponse code is 404. Keeps old results in cache.
        setEmployee(undefined);
    };

    return (
        <>
            <Panel className={style.wrapper}>
                <Heading size="large">Brukere og deres roller i innbyggerpanelet</Heading>
                <Search
                    label="Søk etter ansatt med navn"
                    value={name}
                    onChange={handleName}
                    variant="simple"
                    hideLabel={false}
                />
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
