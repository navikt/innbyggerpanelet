import { Accordion, BodyShort, Heading, Loader, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { APIError } from '../../components/misc/apiError/APIError';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';

import style from './CriteriaAdminPanel.module.scss';
import { CriteriaTable } from './';

export const CriteriaAdminPanel = (): ReactElement => {
    const { categories, isLoading, isError } = useCriteriaCategory();

    if (isError) return <APIError error={isError} />;

    if (isLoading || !categories) return <Loader />;

    return (
        <Panel className={style.wrapper}>
            <Heading size="large">Kriterieoversikt</Heading>
            {categories.map((category, index) => (
                <Accordion key={index}>
                    <Accordion.Item>
                        <Accordion.Header>{category.name}</Accordion.Header>
                        <Accordion.Content>
                            <div className={style.accordionBody}>
                                <BodyShort>{category.description}</BodyShort>
                                <CriteriaTable category={category} />
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            ))}
        </Panel>
    );
};
