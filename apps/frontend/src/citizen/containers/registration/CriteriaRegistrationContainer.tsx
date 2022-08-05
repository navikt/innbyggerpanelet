import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Checkbox, CheckboxGroup, Panel, Radio, RadioGroup } from '@navikt/ds-react';
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
            {criterias?.[0].exclusivitySlug 
                ?  
                <RadioGroup legend={criteriaCategory.name} size="small">
                    {criterias.map((criteria) => {
                        return <Radio value={criteria.name}>{criteria.name}</Radio>;
                    })}
                </RadioGroup>
                : 
                <CheckboxGroup legend={criteriaCategory.name} size="small">
                    {criterias?.map((criteria) => {
                        return <Checkbox value={criteria.name}>{criteria.name}</Checkbox>;
                    })}
                </CheckboxGroup>
            }
        </Panel>
    );
}