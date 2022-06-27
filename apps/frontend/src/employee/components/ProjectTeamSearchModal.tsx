import { IEmployee, IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Heading, Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useTeamMemberByName } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './Modals.module.scss';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    open: boolean;
    close: () => void;
}

export const ProjectTeamSearchModal = ({ project, setProject, open, close }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { employees, loading, error } = useTeamMemberByName(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const addUser = (employee: IEmployee) => {
        setProject({ ...project, members: [...project.members, employee] });
        close();
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Heading size="medium">Legg til et nytt medlem.</Heading>
                <SearchField label="Brukere" description={<div>Søk etter flere NAV ansatte her</div>}>
                    <SearchField.Input onChange={handleSearch} value={search} />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>

                <div className={style.results}>
                    {employees?.map((employee, index) => (
                        <div className={style.result} key={index} onClick={() => addUser(employee)}>
                            + {employee.firstname + ' ' + employee.surname}
                        </div>
                    )) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    );
};
