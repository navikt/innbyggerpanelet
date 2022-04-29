import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Link } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useUser } from '../../../api/hooks';
import style from './Header.module.scss';

export const Header = (): ReactElement => {
    const location = useLocation();

    // Get subpath
    const subPath = location.pathname.split('/')[1];

    const adminStyle = subPath === 'admin' ? style.admin : style.noUnderline;
    const homeStyle = subPath === 'hjem' ? style.home : style.noUnderline;

    const { user, loading, error } = useUser();

    return (
        <div className={style.banner}>
            <RouterLink to="/">
                <Heading size="2xlarge">Innbyggerpanelet</Heading>
            </RouterLink>
            <div className={style.buttonGroup}>
                {user ? (
                    <>
                        {user.role === EnumUserRole.Admin ? (
                            <RouterLink className={adminStyle} to="/admin">
                                <Button variant="tertiary">Admin</Button>
                            </RouterLink>
                        ) : null}

                        <RouterLink className={homeStyle} to="/hjem">
                            <Button variant="tertiary">Min side</Button>
                        </RouterLink>
                        <Link href="/api/azure/logout">
                            <Button>Logg ut</Button>
                        </Link>
                    </>
                ) : (
                    <Link href="/api/azure/login">
                        <Button>Logg inn</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};
