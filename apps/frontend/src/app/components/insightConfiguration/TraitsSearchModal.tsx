import { Trait } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { FC } from 'react';

import style from './SearchModal.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addTrait: (trait: Trait) => void;
}

export const TraitsSearchModal: FC<IProps> = ({ open, close, addTrait }) => {
    // Query API for results
    const traits: Trait[] = [{ id: 12, name: 'Under 25 år' }];

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
