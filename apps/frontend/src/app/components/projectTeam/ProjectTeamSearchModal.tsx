import { IInsightProject, IUser } from '@innbyggerpanelet/api-interfaces';
import { Heading, Loader, Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useUserByName } from '../../api/hooks/useUser';
import { APIError } from '../misc/apiError/APIError';

import style from './ProjectTeam.module.scss';

interface IProps {
    project: IInsightProject;
    setProject: (project: IInsightProject) => void;
    open: boolean;
    close: () => void;
}

export const ProjectTeamSearchModal = ({
    project,
    setProject,
    open,
    close,
}: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { users, isLoading, isError } = useUserByName(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const addUser = (user: IUser) => {
        setProject({ ...project, members: [...project.members, user] });
        close();
    };

    if (isError) return <APIError error={isError} />;

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Heading size="medium">Legg til et nytt medlem.</Heading>
                <SearchField
                    label="Brukere"
                    description={<div>Søk etter flere NAV ansatte her</div>}>
                    <SearchField.Input onChange={handleSearch} value={search} />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                {isLoading || !users ? (
                    <Loader />
                ) : (
                    <div className={style.results}>
                        {users.map((user, index) => (
                            <div
                                className={style.result}
                                key={index}
                                onClick={() => addUser(user)}>
                                + {user.name}
                            </div>
                        ))}
                    </div>
                )}
            </Modal.Content>
        </Modal>
    );
};
