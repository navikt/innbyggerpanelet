import { Accordion, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useCriteriaCategory } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import { CriteriaTable } from '../containers';
import { CriteriaCategoryCreateModal } from '../containers/CriteriaCategoryCreateModal';
import style from './CriteriaAdministration.module.scss';

export const CriteriaAdministration = (): ReactElement => {
    const { categories, loading, error } = useCriteriaCategory();

    const [categoryModal, setCategoryModal] = useState(false);
    const toggleModal = () => setCategoryModal(!categoryModal);

    return (
        <>
            <Panel className={style.criteriaWrapper}>
                <div className={style.heading}>
                    <Heading size="large">Kriterieoversikt</Heading>
                    <Button onClick={toggleModal}>Ny kategori</Button>
                </div>
                <Accordion>
                    {categories?.map((category, index) => (
                        <Accordion.Item key={index}>
                            <Accordion.Header>{category.name}</Accordion.Header>
                            <Accordion.Content className={style.accordionBody}>
                                <BodyShort>{category.description}</BodyShort>
                                <CriteriaTable category={category} />
                            </Accordion.Content>
                        </Accordion.Item>
                    )) || <APIHandler error={error} loading={loading} />}
                </Accordion>
            </Panel>
            <CriteriaCategoryCreateModal open={categoryModal} close={toggleModal} />
        </>
    );
};
