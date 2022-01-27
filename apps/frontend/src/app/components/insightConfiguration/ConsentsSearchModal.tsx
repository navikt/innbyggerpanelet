import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { ReactElement } from 'react';

import style from './SearchModal.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addConsent: (consent: IConsent) => void;
}

export const ConsentsSearchModal = ({
    open,
    close,
    addConsent,
}: IProps): ReactElement => {
    // Query API for results
    // Remove item on click
    const consents: IConsent[] = [
        { id: 1, description: 'Samtykker til skjermopptak' },
    ];

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.wrapper}>
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
                                className={style.result}
                                onClick={() => addConsent(consent)}>
                                + {consent.description}
                            </div>
                        );
                    })}
                </div>
            </Modal.Content>
        </Modal>
    );
};
