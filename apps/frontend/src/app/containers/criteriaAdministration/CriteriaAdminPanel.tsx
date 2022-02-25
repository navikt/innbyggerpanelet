import { Accordion, BodyShort, Button, Heading, Loader, Panel } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { APIError } from '../../components/misc/apiError/APIError';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { CriteriaTable } from './';
import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';

import style from './CriteriaAdminPanel.module.scss';
import { CriteriaCategoryCreateModal } from './CriteriaCategoryCreateModal';

export const CriteriaAdminPanel = (): ReactElement => {
    const { categories, isLoading, isError } = useCriteriaCategory();

    const [categoryModal, setCategoryModal] = useState(false);
    const toggleModal = () => setCategoryModal(!categoryModal);

    if (isError) return <APIError error={isError} />;
    if (isLoading) return <Loader />;
    if (!categories) return <Heading size="large">Finner ingen kriterier</Heading>;

    return (
        <>
            <Panel className={style.wrapper}>
                <Button onClick={toggleModal}>Ny kategori</Button>
                <Heading size="large">Kriterieoversikt</Heading>
                <Accordion>
                    {categories.map((category, index) => (
                        <Accordion.Item key={index}>
                            <Accordion.Header>{category.name}</Accordion.Header>
                            <Accordion.Content className={style.accordionBody}>
                                <BodyShort>{category.description}</BodyShort>
                                <CriteriaTable category={category} />
                            </Accordion.Content>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Panel>
            <CriteriaCategoryCreateModal open={categoryModal} close={toggleModal} />
        </>
    );
};
