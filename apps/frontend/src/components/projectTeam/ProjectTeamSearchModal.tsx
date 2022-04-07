import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useUserByName } from '../../api/hooks/useUser';
import { APIHandler } from '../misc/apiHandler';

import style from './ProjectTeam.module.scss';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    open: boolean;
    close: () => void;
}

export const ProjectTeamSearchModal = ({ project, setProject, open, close }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { users, loading, error } = useUserByName(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const addUser = (user: IUser) => {
        setProject({ ...project, members: [...project.members, user] });
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
                    {users?.map((user, index) => (
                        <div className={style.result} key={index} onClick={() => addUser(user)}>
                            + {user.name}
                        </div>
                    )) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    );
};
