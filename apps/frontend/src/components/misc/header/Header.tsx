import { EnumEmployeeRole, ICitizen, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Link } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../../../api/hooks';
import style from './Header.module.scss';

export const Header = (): ReactElement => {
    const location = useLocation();
    const navigate = useNavigate();

    // Get subpath
    const subPath = location.pathname.split('/')[1];

    const adminStyle = subPath === 'admin' ? style.admin : '';
    const homeStyle = subPath === 'hjem' ? style.home : '';
    const inboxStyle = subPath === 'meldinger' ? style.inbox : '';

    const { user, loading, error } = useUser<ICitizen | IEmployee>();

    if (user) {
        if (!user.registered && subPath !== 'registrer') navigate('/registrer');
        if (user.registered && subPath === 'registrer') navigate('/profil');

        return (
            <HeaderWrapper>
                {user.role === EnumEmployeeRole.Admin ? (
                    <RouterLink className={adminStyle} to="/admin">
                        <Button variant="tertiary">Admin</Button>
                    </RouterLink>
                ) : null}
                <RouterLink className={homeStyle} to="/hjem">
                    <Button variant="tertiary">Min side</Button>
                </RouterLink>
                <RouterLink className={inboxStyle} to="/meldinger">
                    <Button variant="tertiary">Mine meldinger</Button>
                </RouterLink>
                <Link href={'/api/auth/logout'}>
                    <Button>Logg ut</Button>
                </Link>
            </HeaderWrapper>
        );
    } else {
        return (
            <HeaderWrapper>
                <RouterLink to="/innlogging">
                    <Button>Logg inn</Button>
                </RouterLink>
            </HeaderWrapper>
        );
    }
};

const HeaderWrapper = ({ children }: { children: ReactElement | ReactElement[] | any }): ReactElement => {
    return (
        <div className={style.banner}>
            <RouterLink to="/">
                <Heading size="2xlarge">Innbyggerpanelet</Heading>
            </RouterLink>
            <div className={style.buttonGroup}>{children}</div>
        </div>
    );
};
