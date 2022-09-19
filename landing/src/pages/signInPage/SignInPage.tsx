import { BodyShort, Button, Link, Panel } from '@navikt/ds-react'
import React, { ReactElement } from 'react'
import style from './SignInPage.module.scss'

export const SignInPage = (): ReactElement => {
    return (
        <Panel>
            <div className={style.buttonGroup}>
                <Link href="/api/idporten/login">
                    <Button as="div">Innlogging for innbyggere</Button>
                </Link>
                <div className={style.breakLine}>
                    <div></div>
                    <BodyShort>eller</BodyShort>
                    <div></div>
                </div>
                <Link href="/api/azure/login">
                    <Button variant="secondary" as="div">
                        Innlogging for ansatte
                    </Button>
                </Link>
            </div>
        </Panel>
    )
}