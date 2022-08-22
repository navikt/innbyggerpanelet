import { BodyLong, Modal, Heading, Button } from '@navikt/ds-react';
import React, { ReactElement } from 'react';
import style from './DeclineConsentModal.module.scss';

export default function DeclineConsentModal({
    open,
    setOpen,
    handleDecline
}: {
    open: boolean
    setOpen: (open: boolean) => void
    handleDecline: () => void
}): ReactElement {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(!open)}
        >
            <Modal.Content>
                <Heading spacing level="1" size="medium">
                    Trekk samtykke
                </Heading>
                <div className={style.modalText}>
                    <BodyLong spacing>
                    Du vil nå kun trekke samtykke ditt for det spesifike innsiktsarbeidet,
                    ditt samtykke for å være registrert i inbyggerpanelet vil fortsatt være gyldig.
                    </BodyLong>
                </div>
                <div className={style.modalButtons}>
                    <Button variant='secondary' onClick={() => setOpen(!open)}>
                        Avbryt
                    </Button>
                    <Button variant='danger' onClick={handleDecline}>
                        Trekk
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
}