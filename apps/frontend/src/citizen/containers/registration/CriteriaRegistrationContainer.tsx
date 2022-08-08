import { ICitizen, ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Checkbox, Heading, Panel } from '@navikt/ds-react';
import { useCriteriaByCategoryId } from '../../../common/api/hooks';
import React, { ReactElement } from 'react';
import style from './CriteriaRegistrationContainer.module.scss';

export function CriteriaRegistrationContainer({
    criteriaCategory,
    citizen,
    setCitizen
}: {
    criteriaCategory: ICriteriaCategory
    citizen: ICitizen
    setCitizen: (citizen: ICitizen) => void
}): ReactElement {

    const { criterias, loading, error } = useCriteriaByCategoryId(criteriaCategory.id);

    const exclusiveAlreadyPicked = (criteria: ICriteria) => {
        const exclusiveExists = citizen.criterias.filter(
            (c) => 
                c.exclusivitySlug === criteria.exclusivitySlug &&
                c.id !== criteria.id &&
                criteria.exclusivitySlug !== '' &&
                criteria.exclusivitySlug !== null
        );
        return exclusiveExists.length > 0;
    };

    const isChecked = (criteria: ICriteria) => {
        const result = citizen.criterias.filter((c) => c.id === criteria.id);
        return result.length > 0;
    };

    const toggleCriteria = (criteria: ICriteria) => {
        if (isChecked(criteria)) {
            const result = citizen.criterias.filter((c) => c.id !== criteria.id);
            setCitizen({ ...citizen, criterias: result });
        } else {
            setCitizen({ ...citizen, criterias: [...citizen.criterias, criteria] });
        }
    };

    return (
        <Panel className={style.citizenCriteriaContainer}>
            
            <Heading size="small">{criteriaCategory.name}</Heading>
            {criterias?.map((criteria, index) => {
                return (
                    <Checkbox
                        key={index}
                        value={criteria.name}
                        onClick={() => toggleCriteria(criteria)}
                        disabled={exclusiveAlreadyPicked(criteria)}
                        checked={isChecked(criteria)}
                    >
                        {criteria.name}
                    </Checkbox>
                );
            })}

        </Panel>
    );
}