import { ITrait } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { ReactElement } from 'react';

import style from './SearchModal.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addTrait: (trait: ITrait) => void;
}

export const TraitsSearchModal = ({
    open,
    close,
    addTrait,
}: IProps): ReactElement => {
    // Query API for results
    // Remove item on click
    const traits: ITrait[] = [
        { id: 12, name: 'Under 25 år' },
        { id: 13, name: 'Over 25 år' },
    ];

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.wrapper}>
                <SearchField
                    label="Kriterier"
                    description={<div>Søk etter kriterier her</div>}>
                    <SearchField.Input />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                <div>
                    {traits.map((trait, index) => {
                        return (
                            <div
                                key={index}
                                className={style.result}
                                onClick={() => addTrait(trait)}>
                                + {trait.name}
                            </div>
                        );
                    })}
                </div>
            </Modal.Content>
        </Modal>
    );
};
