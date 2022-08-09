import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Add } from '@navikt/ds-icons';
import { Button, Table } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { mutate } from 'swr';
import { CriteriaCreateModal, CriteriaEditModal } from '.';
import { useCriteriaByCategoryId } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { CriteriaAdminRow } from '../components';

interface IProps {
    category: ICriteriaCategory;
}

export const CriteriaTable = ({ category }: IProps): ReactElement => {
    const [editCriteria, setEditCriteria] = useState<ICriteria>();
    const [newCriteria, setNewCriteria] = useState(false);

    const { criterias, loading, error } = useCriteriaByCategoryId(category.id);

    const handleEditModalClose = () => {
        mutate(`/api/criteria?where[category]=${category.id}`);
        setEditCriteria(undefined);
    };

    return (
        <>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell scope="col">ID</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                        <Table.HeaderCell scope="col">Eksklusivitet Slug</Table.HeaderCell>
                        <Table.HeaderCell scope="col">I bruk</Table.HeaderCell>
                        <Table.HeaderCell>Rediger</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {criterias?.map((criteria, index) => (
                        <CriteriaAdminRow key={index} criteria={criteria} edit={setEditCriteria} />
                    )) || <APIHandler error={error} loading={loading} />}
                </Table.Body>
            </Table>
            <Button variant="secondary" size="medium" onClick={() => setNewCriteria(true)}>
                <Add />
                Legg til kriterie i kategorien {category.name}
            </Button>
            {!editCriteria || (
                <CriteriaEditModal
                    criteria={editCriteria}
                    open={editCriteria !== undefined}
                    close={handleEditModalClose}
                    setCriteria={setEditCriteria}
                />
            )}
            <CriteriaCreateModal category={category} open={newCriteria} close={() => setNewCriteria(false)} />
        </>
    );
};
