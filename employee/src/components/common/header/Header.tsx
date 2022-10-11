import { Hamburger } from '@navikt/ds-icons'
import { Button, Heading, Link } from '@navikt/ds-react'

import React, { ReactElement, useEffect, useState } from 'react'

import { Link as RouterLink, useLocation } from 'react-router-dom'

import style from './Header.module.scss'

export const Header = (): ReactElement => {
    return (
        <HeaderWrapper>
            <RouterLink className={style.home} to={'/'}>
                <Button variant="tertiary" as="div">
                    Min side
                </Button>
            </RouterLink>
            <RouterLink className={style.inbox} to="/meldinger">
                <Button variant="tertiary" as="div">
                    Mine meldinger
                </Button>
            </RouterLink>
            {/** TODO: FIX PROPPER LOGUT WITH IDPORTEN */}
            <Link href={'/api/auth/logout'}>
                <Button as="div">Logg ut</Button>
            </Link>
        </HeaderWrapper>
    )
}

const HeaderWrapper = ({ children }: { children: ReactElement | ReactElement[] | undefined }): ReactElement => {
    const [menuToggle, setMenuToggle] = useState(false)

    const handleToggleMenu = () => setMenuToggle(!menuToggle)

    return (
        <div className={style.banner}>
            <RouterLink to="/">
                <Heading size="xlarge">Innbyggerpanelet</Heading>
            </RouterLink>
            <Hamburger onClick={handleToggleMenu} className={style.hamburger} />
            <div className={`${style.buttonGroup} ${menuToggle ? style.hamburgerMenu : style.hidden}`}>{children}</div>
        </div>
    )
}
