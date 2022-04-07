import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { ReactElement } from 'react';

import style from './CriteriaAdminPanel.module.scss';

interface IProps {
    criteria?: ICriteria;
    open: boolean;
    close: () => void;
}

// Can be refactored into an abstract modal for both patching and posting
// by turning heading and body into react children and adding a submit function prop.
export const CriteriaEditModal = ({ criteria, open, close }: IProps): ReactElement => {
    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="small">Rediger kriterie</Heading>
                <BodyShort className={style.editWarning}>
                    Vær obs på at å redigere enkelte kriterier kan få store konsekvenser for kandidatene.
                </BodyShort>
                <TextField label="Navn" value={criteria?.name} />
                <TextField label="Eklusivitet slug" value={criteria?.exclusivitySlug} placeholder="none" />
                <Button>Bekreft</Button>
            </Modal.Content>
        </Modal>
    );
};
