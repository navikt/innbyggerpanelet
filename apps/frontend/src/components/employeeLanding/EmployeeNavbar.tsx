import { Email } from '@navikt/ds-icons';
import { Link, Button } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './EmployeeNavbar.module.scss';

export default function EmployeeNavbar(): ReactElement {
    return (
        <div className={style.navbarContainer}>
            <Link href="#/profil">
                Min profil
            </Link>
            <Email width={'1.75rem'} height={'1.75rem'}/>
            <div>
                <Button variant="primary" size="medium">
                Logg ut
                </Button>
            </div>
        </div>
    );
}