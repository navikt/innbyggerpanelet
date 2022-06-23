import { People } from '@navikt/ds-icons';
import { Heading } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './UserInfo.module.scss';

export const UserInfo = ({ name }: { name: string | undefined }): ReactElement => {
    return (
        <div className={style.userInfoContainer}>
            <People width={'5rem'} height={'5rem'} />
            <Heading size="medium">{name}</Heading>
        </div>
    );
};
