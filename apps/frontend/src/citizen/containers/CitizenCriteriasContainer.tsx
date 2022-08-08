import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Label } from '@navikt/ds-react';
import { ReactElement } from 'react';
import style from './CitizenCriteriasContainer.module.scss';

interface IProps {
    criterias: ICriteria[];
}

export function CitizenCriteriasContainer({ criterias }: IProps): ReactElement {
    console.log(criterias);
    return (
        <div className={style.wrapper}>
            {criterias?.map((criteria, index) => (
                <div key={index}>
                    <Label>{criteria.category.name}</Label>
                    <BodyShort>{criteria.name}</BodyShort>
                </div>
            ))}
        </div>
    );
}
