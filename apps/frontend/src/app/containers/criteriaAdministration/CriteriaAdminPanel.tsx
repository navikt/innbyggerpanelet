import { ICriteriaCategory, ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Add } from '@navikt/ds-icons';
import {
    Accordion,
    BodyShort,
    Button,
    Heading,
    Loader,
    Panel,
    Table,
} from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { APIError } from '../../components/misc/apiError/APIError';
import { useCriteriaCategory } from '../../hooks/useCriteriaCategory';
import { mocks } from '../../utils/mocks';

import style from './CriteriaAdminPanel.module.scss';
import { CriteriaTable } from './';

export const CriteriaAdminPanel = (): ReactElement => {
    const categories: ICriteriaCategory[] = mocks.allCriteriaCategories;

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
    );
};
