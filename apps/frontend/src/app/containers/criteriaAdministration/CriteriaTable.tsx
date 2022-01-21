import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Table } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { CriteriaEditModal } from '.';
import { CriteriaAdminRow } from '../../components/criteriaAdministration';
import { mocks } from '../../utils/mocks';

interface IProps {
    category: ICriteriaCategory;
}

export const CriteriaTable = ({ category }: IProps): ReactElement => {
    const [editCriteria, setEditCriteria] = useState<ICriteria>();

    const criterias = mocks.allCriterias.filter(
        (c) => c.category.id === category.id
    );

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">
                            Eksklusivitet Slug
                        </Table.HeaderCell>
                        <Table.HeaderCell>Rediger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {criterias.map((criteria, index) => (
                        <CriteriaAdminRow
                            key={index}
                            criteria={criteria}
                            edit={setEditCriteria}
                        />
                    ))}
                </Table.Body>
            </Table>
            <CriteriaEditModal
                criteria={editCriteria}
                open={editCriteria != undefined}
                close={() => setEditCriteria(undefined)}
            />
        </>
    );
};
