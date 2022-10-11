import { Heading, Modal, Search } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { useTeamMemberByName } from '../../api/hooks/UseEmployee'
import { IEmployee, IInsightProject } from '../../types'
import { APIHandler } from '../common/apiHandler/APIHandler'
import style from './Modals.module.scss'

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    open: boolean;
    close: () => void;
}

export const ProjectTeamSearchModal = ({ project, setProject, open, close }: IProps): ReactElement => {
    const [search, setSearch] = useState('')
    const { employees, loading, error } = useTeamMemberByName(search)

    const handleSearch = (input: string) => {
        setSearch(input)
    }

    const addUser = (employee: IEmployee) => {
        setProject({ ...project, members: [...project.members, employee] })
        close()
    }

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Heading size="medium">Legg til et nytt medlem.</Heading>
                <Search variant="simple" label="Brukere" onChange={handleSearch} value={search} />
                <div className={style.results}>
                    {Array.isArray(employees) ? employees?.map((employee, index) => (
                        <div className={style.result} key={index} onClick={() => addUser(employee)}>
                            + {employee.firstname + ' ' + employee.surname}
                        </div>
                    )) || <APIHandler error={error} loading={loading} /> : <APIHandler error={error} loading={loading} /> }
                </div>
            </Modal.Content>
        </Modal>
    )
}
