import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Accordion, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { IValidationError } from '../../core/hooks/useFormatValidationErrors';
import { APIHandler } from '../misc/apiHandler';
import ErrorList from '../misc/validation/ErrorList';
import { UserEditCriteriaTable } from './UserEditCriteriaTable';

interface IProps {
    user: IUser;
    setUser: (user: IUser) => void;
    validationErrors: IValidationError;
}

export const UserEditCriterias = ({ user, setUser, validationErrors }: IProps): ReactElement => {
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
            {validationErrors.criterias && <ErrorList errorMessages={[...validationErrors.criterias]} />}
        </Panel>
    );
};
