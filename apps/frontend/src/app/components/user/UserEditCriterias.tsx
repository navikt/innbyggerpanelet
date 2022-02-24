import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Accordion, Heading, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { APIError } from '../misc/apiError/APIError';
import { UserEditCriteriaTable } from './UserEditCriteriaTable';

interface IProps {
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditCriterias = ({ user, setUser }: IProps): ReactElement => {
    const { categories, isLoading, isError } = useCriteriaCategory();

    if (isError) return <APIError error={isError} />;
    if (isLoading) return <Loader />;
    if (!categories) return <Heading size="large">Det finnes ingen kriterier</Heading>;

    return (
        <Panel>
            <Heading size="large">Egenskaper</Heading>
            <Accordion>
                {categories.map((category, index) => (
                    <Accordion.Item key={index}>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Content>
                            <UserEditCriteriaTable categoryId={category.id} user={user} setUser={setUser} />
                        </Accordion.Content>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Panel>
    );
};
