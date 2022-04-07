import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import style from './Header.module.scss';

export const Header = (): ReactElement => {
    return (
        <div className={style.wrapper}>
            <Heading size="2xlarge">
                <Link to="/">NAVs Innbyggerpanel</Link>
            </Heading>
        </div>
    );
};
