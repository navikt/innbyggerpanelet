import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Add } from '@navikt/ds-icons';
import { BodyShort, Button, Loader, Table } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { CriteriaCreateModal, CriteriaEditModal } from '.';
import { CriteriaAdminRow } from '../../components/criteriaAdministration';
import { APIError } from '../../components/misc/apiError/APIError';
import { useCriteriaByCategoryId } from '../../api/hooks/useCriteria';
import { mocks } from '../../utils/mocks';

interface IProps {
    category: ICriteriaCategory;
}

export const CriteriaTable = ({ category }: IProps): ReactElement => {
    const [editCriteria, setEditCriteria] = useState<ICriteria>();
    const [newCriteria, setNewCriteria] = useState(false);

    const { criterias, isLoading, isError } = useCriteriaByCategoryId(category.id);

    if (isError && isError.request.status !== 404) return <APIError error={isError} />;
    if (isLoading) return <Loader />;

    return (
        <>
            {criterias ? (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell scope="col">ID</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Navn</Table.HeaderCell>
                            <Table.HeaderCell scope="col">Eksklusivitet Slug</Table.HeaderCell>
                            <Table.HeaderCell>Rediger</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {criterias.map((criteria, index) => (
                            <CriteriaAdminRow key={index} criteria={criteria} edit={setEditCriteria} />
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <BodyShort>Fant ingen kriterier</BodyShort>
            )}
            <Button variant="secondary" size="medium" onClick={() => setNewCriteria(true)}>
                <Add />
                Legg til kriterie i kategorien {category.name}
            </Button>
            <CriteriaEditModal
                criteria={editCriteria}
                open={editCriteria !== undefined}
                close={() => setEditCriteria(undefined)}
            />
            <CriteriaCreateModal category={category} open={newCriteria} close={() => setNewCriteria(false)} />
        </>
    );
};
