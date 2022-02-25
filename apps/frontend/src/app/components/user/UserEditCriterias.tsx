import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Accordion, Heading, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { APIHandler } from '../misc/apiHandler';
import { UserEditCriteriaTable } from './UserEditCriteriaTable';

interface IProps {
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditCriterias = ({ user, setUser }: IProps): ReactElement => {
    const { categories, loading, error } = useCriteriaCategory();

    return (
        <Panel>
            <Heading size="large">Egenskaper</Heading>
            <Accordion>
                {categories?.map((category, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Content>
                            <UserEditCriteriaTable categoryId={category.id} user={user} setUser={setUser} />
                        </Accordion.Content>
                    </Accordion.Item>
                )) || <APIHandler error={error} loading={loading} />}
            </Accordion>
        </Panel>
    );
};
