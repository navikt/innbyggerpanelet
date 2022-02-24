import { Accordion, BodyShort, Heading, Panel } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useCriteriaCategory } from '../../api/hooks/useCriteriaCategory';
import { CriteriaTable } from './';
import { APIHandler } from '../../components/misc/apiHandler';

import style from './CriteriaAdminPanel.module.scss';

export const CriteriaAdminPanel = (): ReactElement => {
    const { categories, loading, error } = useCriteriaCategory();

    return (
        <Panel className={style.wrapper}>
            <Heading size="large">Kriterieoversikt</Heading>
            {categories?.map((category, index) => (
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
            )) || <APIHandler error={error} loading={loading} />}
        </Panel>
    );
};
