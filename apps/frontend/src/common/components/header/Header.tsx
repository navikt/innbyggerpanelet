import { EnumUserRole, ICitizen, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Hamburger } from '@navikt/ds-icons';
import { Button, Heading, Link } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useUser } from '../../api/hooks';
import { useUserPermissions } from '../../hooks/';
import style from './Header.module.scss';

export const Header = (): ReactElement => {
    const location = useLocation();
    const authorize = useUserPermissions();

    // Get subpath
    const fullPath = location.pathname;
    const subPath = fullPath.split('/')[1];

    const adminStyle = subPath === 'admin' ? style.admin : '';
    const homeStyle = fullPath === '/innbygger' || fullPath === '/ansatt' ? style.home : '';
    const inboxStyle = subPath === 'meldinger' ? style.inbox : '';

    const { user, loading, error } = useUser<ICitizen | IEmployee>();

    if (user) {
        authorize(user);

        return (
            <HeaderWrapper>
                {user.role === EnumUserRole.Admin ? (
                    <RouterLink className={adminStyle} to="/admin">
                        <Button variant="tertiary" as="div">
                            Admin
                        </Button>
                    </RouterLink>
                ) : null}
                <RouterLink className={homeStyle} to={user.role === EnumUserRole.Citizen ? '/innbygger' : '/ansatt'}>
                    <Button variant="tertiary" as="div">
                        Min side
                    </Button>
                </RouterLink>
                <RouterLink className={inboxStyle} to="/meldinger">
                    <Button variant="tertiary" as="div">
                        Mine meldinger
                    </Button>
                </RouterLink>
                <Link href={'/api/auth/logout'}>
                    <Button as="div">Logg ut</Button>
                </Link>
            </HeaderWrapper>
        );
    } else {
        return (
            <HeaderWrapper>
                <RouterLink to="/innlogging">
                    <Button as="div">Logg inn</Button>
                </RouterLink>
            </HeaderWrapper>
        );
    }
};

const HeaderWrapper = ({ children }: { children: ReactElement | ReactElement[] | any }): ReactElement => {
    const [menuToggle, setMenuToggle] = useState(false);

    const handleToggleMenu = () => setMenuToggle(!menuToggle);

    return (
        <div className={style.banner}>
            <RouterLink to="/">
                <Heading size="xlarge">Innbyggerpanelet</Heading>
            </RouterLink>
            <Hamburger onClick={handleToggleMenu} className={style.hamburger} />
            <div className={`${style.buttonGroup} ${menuToggle ? style.hamburgerMenu : style.hidden}`}>{children}</div>
        </div>
    );
};
