import { Heading } from '@navikt/ds-react';
import React, { ReactElement, useEffect, useState } from 'react';

import style from './PropertieValueField.module.scss';

export default function PropertieValueField(
    {
        propertie,
        value
    } : {
        propertie: string
        value?: string
    }
): ReactElement {
    const [propertieValue, setPropertieValue] = useState<string | undefined>(value);

    if (propertieValue === undefined || propertieValue === '') {
        setPropertieValue('-');
    }

    return(
        <div className={style.propertieValueField}>
            <Heading className={style.propertieHeading} size="small">{propertie}</Heading>
            <p>{propertieValue}</p>
        </div>
    );
}