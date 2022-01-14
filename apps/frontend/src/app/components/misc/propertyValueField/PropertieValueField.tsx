import { Heading } from '@navikt/ds-react';
import React, { ReactElement, useEffect, useState } from 'react';

import style from './PropertyValueField.module.scss';

export default function PropertyValueField(
    {
        property,
        value
    } : {
        property: string
        value?: string
    }
): ReactElement {
    const [propertyValue, setPropertyValue] = useState<string | undefined>(value);

    if (propertyValue === undefined || propertyValue === '') {
        setPropertyValue('-');
    }

    return(
        <div className={style.propertieValueField}>
            <Heading className={style.propertieHeading} size="small">{property}</Heading>
            <p>{propertyValue}</p>
        </div>
    );
}