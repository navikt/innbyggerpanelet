import { ICriteriaCategory, ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Add, Edit } from '@navikt/ds-icons';
import {
    Accordion,
    BodyShort,
    Button,
    Loader,
    Panel,
    Table,
} from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { APIError } from '../../components/misc/apiError/APIError';
import { useCriteriaCategory } from '../../hooks/useCriteriaCategory';

import style from './CriteriaAdminPanel.module.scss';
import { CriteriaEditModal } from './CriteriaEditModal';

export const CriteriaAdminPanel = (): ReactElement => {
    const [editCriteria, setEditCriteria] = useState<ICriteria>();

    const categories: ICriteriaCategory[] = [
        {
            id: 1,
            name: 'Alder',
            description: 'Kandidatens aldergruppe.',
            criterias: [
                { id: 1, name: 'Mellom 18 og 25 år', exclusivitySlug: 'age' },
                { id: 2, name: 'Mellom 26 og 35 år', exclusivitySlug: 'age' },
            ],
        },
        {
            id: 2,
            name: 'Hjelpemidler',
            description:
                'Utvalg av mulige hjelpemidler tatt i bruk av kandidat.',
            criterias: [
                { id: 3, name: 'Skjermoppleser' },
                { id: 4, name: 'Rullestol' },
            ],
        },
    ];

    return (
        <>
            <Panel>
                {categories.map((category, index) => (
                    <Accordion key={index}>
                        <Accordion.Item>
                            <Accordion.Header>{category.name}</Accordion.Header>
                            <Accordion.Content>
                                <div className={style.accordionBody}>
                                    <BodyShort>
                                        {category.description}
                                    </BodyShort>
                                    <Table>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell scope="col">
                                                    ID
                                                </Table.HeaderCell>
                                                <Table.HeaderCell scope="col">
                                                    Navn
                                                </Table.HeaderCell>
                                                <Table.HeaderCell scope="col">
                                                    Eksklusivitet Slug
                                                </Table.HeaderCell>
                                                <Table.HeaderCell>
                                                    Rediger
                                                </Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {category.criterias.map(
                                                (criteria, index) => (
                                                    <Table.Row key={index}>
                                                        <Table.HeaderCell>
                                                            {criteria.id}
                                                        </Table.HeaderCell>
                                                        <Table.DataCell>
                                                            {criteria.name}
                                                        </Table.DataCell>
                                                        <Table.DataCell>
                                                            {criteria.exclusivitySlug ||
                                                                'none'}
                                                        </Table.DataCell>
                                                        <Table.DataCell>
                                                            <Edit
                                                                className={
                                                                    style.edit
                                                                }
                                                                onClick={() =>
                                                                    setEditCriteria(
                                                                        criteria
                                                                    )
                                                                }
                                                            />
                                                        </Table.DataCell>
                                                    </Table.Row>
                                                )
                                            )}
                                        </Table.Body>
                                    </Table>
                                    <Button variant="secondary" size="medium">
                                        <Add />
                                        Legg til kriterie i gruppe
                                    </Button>
                                </div>
                            </Accordion.Content>
                        </Accordion.Item>
                    </Accordion>
                ))}
            </Panel>
            <CriteriaEditModal
                criteria={editCriteria}
                open={editCriteria != undefined}
                close={() => setEditCriteria(undefined)}
            />
        </>
    );
};
