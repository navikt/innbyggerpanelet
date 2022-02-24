import { Accordion, BodyShort, Button, Heading, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { CriteriaTable } from './';
import { APIHandler } from '../../components/misc/apiHandler';

import style from './CriteriaAdminPanel.module.scss';
import { CriteriaCategoryCreateModal } from './CriteriaCategoryCreateModal';

export const CriteriaAdminPanel = (): ReactElement => {
    const { categories, loading, error } = useCriteriaCategory();

    const [categoryModal, setCategoryModal] = useState(false);
    const toggleModal = () => setCategoryModal(!categoryModal);

    return (
        <>
            <Panel className={style.wrapper}>
                <Button onClick={toggleModal}>Ny kategori</Button>
                <Heading size="large">Kriterieoversikt</Heading>
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
