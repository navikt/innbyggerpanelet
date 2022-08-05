import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Panel, Radio, RadioGroup } from '@navikt/ds-react';
import { useCriteriaByCategoryId } from '../../../common/api/hooks';
import React, { ReactElement } from 'react';
import style from './CriteriaRegistrationContainer.module.scss';

export function CriteriaRegistrationContainer({
    criteriaCategory
}: {
    criteriaCategory: ICriteriaCategory
}): ReactElement {

    const { criterias, loading, error } = useCriteriaByCategoryId(criteriaCategory.id);

    return (
        <Panel className={style.citizenCriteriaContainer}>
            <RadioGroup legend={criteriaCategory.name} size="medium">
                {criterias?.map((criteria) => {
                    return <Radio value={criteria.name}>{criteria.name}</Radio>;
                })}
            </RadioGroup>
        </Panel>
    );
}