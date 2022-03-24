import { Heading } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { useLocation, Link } from 'react-router-dom';

import style from './Breadcrumbs.module.scss';

export const Breadcrumbs = (): ReactElement => {
    const location = useLocation();

    const breadcrumbs = location.pathname
        .split('/')
        .filter((link) => link !== '');

    if (breadcrumbs.length === 0) {
        return <></>;
    }

    return (
        <div className={style.wrapper}>
            <Link to="/">Hjem</Link>
            {breadcrumbs.map((bc, index) => (
                <span key={index}>
                    <Heading size="xsmall">/</Heading>
                    {breadcrumbs.length !== index + 1 ? (
                        <Link
                            to={`/${breadcrumbs
                                .slice(0, index + 1)
                                .join('/')}`}>
                            {bc}
                        </Link>
                    ) : (
                        <Heading size="xsmall">{bc}</Heading>
                    )}
                </span>
            ))}
        </div>
    );
};
