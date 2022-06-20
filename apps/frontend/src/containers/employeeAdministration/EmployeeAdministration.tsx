import { EnumEmployeeRole, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Edit } from '@navikt/ds-icons';
import { Heading, Panel, Select, Table, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { mutate } from 'swr';
import { useEmployeesByNameAndRole } from '../../api/hooks';
import { APIHandler } from '../../components/misc/apiHandler';
import style from './EmployeeAdministration.module.scss';
import { EmployeeEditModal } from './EmployeeEditModal';

export const EmployeeAdministration = (): ReactElement => {
    const [name, setName] = useState<string>('');
    const [role, setRole] = useState<EnumEmployeeRole>(EnumEmployeeRole.InsightWorker);
    const [employee, setEmployee] = useState<IEmployee>();

    const { employees, loading, error } = useEmployeesByNameAndRole(name, role);

    const handleName = (event: ChangeEvent<HTMLInputElement>) => setName(event.target.value);
    const handleRole = (event: ChangeEvent<HTMLSelectElement>) => setRole(event.target.value as EnumEmployeeRole);
    const handleModalClose = () => {
        mutate(`/api/employee?where[name]=%${name}%&where[role]=${role}`); // Will not refresh component if reponse code is 404. Keeps old results in cache.
        setEmployee(undefined);
    };

    return (
        <>
            <Panel>
                <Heading size="large">Brukere og deres roller i innbyggerpanelet</Heading>
                <div className={style.filter}>
                    <TextField label="Navn" value={name} onChange={handleName} />
                    <Select label="Rolle" onChange={handleRole} value={role}>
                        <option value={EnumEmployeeRole.InsightWorker}>Innsiktsarbeider</option>
                        <option value={EnumEmployeeRole.Admin}>Administrator</option>
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
                        {employees?.map((employee, index) => (
                            <Table.Row key={index}>
                                <Table.DataCell>{employee.name}</Table.DataCell>
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
