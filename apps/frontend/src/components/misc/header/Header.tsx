import { Button, Heading, Link } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useUser } from '../../../api/hooks';
import style from './Header.module.scss';

export const Header = (): ReactElement => {
    const { user, loading, error } = useUser();

    const verifyTypeScriptTypeOfUser = (user: any): boolean => {
        if (user === undefined) {
            return false;
        } else if (user instanceof String) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div className={style.banner}>
            <RouterLink to="/">
                <Heading size="2xlarge">Innbyggerpanelet</Heading>
            </RouterLink>
            <div className={style.buttonGroup}>
                <RouterLink to="#">Hva skjer</RouterLink>
                <RouterLink to="#">Mer informasjon</RouterLink>

                {!verifyTypeScriptTypeOfUser(user) ? (
                    <>
                        <RouterLink to="/hjem">
                            <Button>Hjem</Button>
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
