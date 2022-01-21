import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import PropertyValueField from '../../components/misc/propertyValueField/PropertyValueField';
import { ICandidate, IUser } from '@innbyggerpanelet/api-interfaces';

import style from './UserProperties.module.scss';

export function UserProperties(user: IUser): ReactElement {
    const { criterias } = user;

    return (
        <div>
            <div className={style.candidateProperties}>
                <Heading size="large">Egenskaper</Heading>
                {criterias.map((criteria, index) => (
                    <PropertyValueField key={index} criteria={criteria} />
                ))}
            </div>
        </div>
    );
}
