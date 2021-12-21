import { Consent } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { FC } from 'react';

interface IProps {
    open: boolean;
    close: () => void;
    addConsent: (consent: Consent) => void;
}

export const ConsentsSearchModal: FC<IProps> = ({
    open,
    close,
    addConsent,
}) => {
    const consents: Consent[] = [{ id: 1, name: 'Samtykker til skjermopptak' }];

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content>
                <SearchField
                    label="Kriterier"
                    description={<div>Søk etter samtykker her</div>}>
                    <SearchField.Input />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                <div>
                    {consents.map((consent, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => addConsent(consent)}>
                                {consent.name}
                            </div>
                        );
                    })}
                </div>
            </Modal.Content>
        </Modal>
    );
};
