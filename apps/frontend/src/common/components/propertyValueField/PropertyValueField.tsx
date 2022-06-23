import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';

import style from './PropertyValueField.module.scss';

interface IProps {
    criteria: ICriteria;
}

export default function PropertyValueField({ criteria }: IProps): ReactElement {
    return (
        <div className={style.propertieValueField}>
            <Heading className={style.propertieHeading} size="small">
                {criteria.name}
            </Heading>
        </div>
    );
}
