import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { Checkbox, Table } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaByCategoryId } from '../../api/hooks/useCriteria';
import { APIHandler } from '../misc/apiHandler';

interface IProps {
    categoryId: number;
    user: IUser;
    setUser: (user: IUser) => void;
}

export const UserEditCriteriaTable = ({ categoryId, user, setUser }: IProps): ReactElement => {
    const { criterias, loading, error } = useCriteriaByCategoryId(categoryId);

    const exclusiveAlreadyPicked = (criteria: ICriteria) => {
        const exclusiveExists = user.criterias.filter(
            (c) =>
                c.exclusivitySlug === criteria.exclusivitySlug &&
                c.id !== criteria.id &&
                criteria.exclusivitySlug !== '' &&
                criteria.exclusivitySlug !== null
        );
        return exclusiveExists.length > 0;
    };

    const isChecked = (criteria: ICriteria) => {
        const result = user.criterias.filter((c) => c.id === criteria.id);
        return result.length > 0;
    };

    const toggleCriteria = (criteria: ICriteria) => {
        if (isChecked(criteria)) {
            const result = user.criterias.filter((c) => c.id !== criteria.id);
            setUser({ ...user, criterias: result });
        } else {
            setUser({ ...user, criterias: [...user.criterias, criteria] });
        }
    };

    return (
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Navn</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {criterias?.map((criteria, index) => (
                    <Table.Row key={index}>
                        <Table.DataCell>{criteria.name}</Table.DataCell>
                        <Table.DataCell>
                            <Checkbox
                                hideLabel
                                onClick={() => toggleCriteria(criteria)}
                                disabled={exclusiveAlreadyPicked(criteria)}
                                checked={isChecked(criteria)}
                            >
                                {criteria.name}
                            </Checkbox>
                        </Table.DataCell>
                    </Table.Row>
                )) || <APIHandler error={error} loading={loading} />}
            </Table.Body>
        </Table>
    );
};
