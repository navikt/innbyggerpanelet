import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Edit } from '@navikt/ds-icons';
import { Table } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './CriteriaAdminRow.module.scss';

interface IProps {
    criteria: ICriteria;
    edit: (criteria: ICriteria) => void;
}

export const CriteriaAdminRow = ({ criteria, edit }: IProps): ReactElement => {
    return (
        <Table.Row>
            <Table.HeaderCell>{criteria.id}</Table.HeaderCell>
            <Table.DataCell>{criteria.name}</Table.DataCell>
            <Table.DataCell>{criteria.exclusivitySlug || 'none'}</Table.DataCell>
            <Table.DataCell>
                <Edit className={style.edit} onClick={() => edit(criteria)} />
            </Table.DataCell>
        </Table.Row>
    );
};
