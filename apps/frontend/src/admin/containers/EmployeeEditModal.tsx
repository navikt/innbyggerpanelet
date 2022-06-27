import { EnumUserRole, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Modal, Select } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, ReactElement, useState } from 'react';
import { updateEmployee } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks';
import style from './Modals.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    employee: IEmployee;
    setEmployee: (employee: IEmployee) => void;
}

export const EmployeeEditModal = ({ open, close, employee, setEmployee }: IProps): ReactElement => {
    const [employeeValidationErrors, setEmployeeValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const newEmployee = { ...employee };
        newEmployee[event.target.id] = event.target.value;
        setEmployee(newEmployee);
    };

    const handleSubmit = async () => {
        const { response, error, validationErrors } = await updateEmployee(employee);
        if (error) return setPutError(error);
        if (validationErrors) return setEmployeeValidationErrors(validationErrors);
        if (response) close();
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="medium">{`Rediger bruker: ${employee.surname} ,${employee.firstname}`}</Heading>
                <Select
                    id="role"
                    label="Rolle"
                    onChange={handleChange}
                    value={employee.role}
                    error={employeeValidationErrors.role}
                >
                    <option value={EnumUserRole.InsightWorker}>Innsiktsarbeider</option>
                    <option value={EnumUserRole.Admin}>Administrator</option>
                </Select>
                {putError && <APIHandler loading={false} error={putError} />}
                <Button onClick={handleSubmit}>Oppdater</Button>
            </Modal.Content>
        </Modal>
    );
};
