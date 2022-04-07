import { Link, Button } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './EmployeeNavbar.module.scss';

export default function EmployeeNavbar(): ReactElement {
    return (
        <div className={style.navbarContainer}>
            <Link href="#/profil">
                Min profil
            </Link>
            <svg width="1.75em" height="1.75em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" focusable="false" role="img"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 5h20v1.764l-10 5-10-5V5zM0 5a2 2 0 012-2h20a2 2 0 012 2v13a3 3 0 01-3 3H3a3 3 0 01-3-3V5zm2 4v9a1 1 0 001 1h18a1 1 0 001-1V9l-10 5L2 9z" fill="currentColor"></path></svg>
            <div>
                <Button variant="primary" size="medium">
                Logg ut
                </Button>
            </div>
        </div>
    );
}