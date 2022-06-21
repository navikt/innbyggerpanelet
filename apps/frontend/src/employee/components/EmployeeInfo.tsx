import { People } from '@navikt/ds-icons';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './components.module.scss';

export const EmployeeInfo = ({ name }: { name: string | undefined }): ReactElement => {
    return (
        <div className={style.employeeInfoContainer}>
            <People width={'5rem'} height={'5rem'} />
            <Heading size="medium">{name}</Heading>
        </div>
    );
};
