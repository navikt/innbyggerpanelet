import { Trait } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { FC } from 'react';

interface IProps {
    open: boolean;
    close: () => void;
    addTrait: (trait: Trait) => void;
}

export const TraitsSearchModal: FC<IProps> = ({ open, close, addTrait }) => {
    const traits: Trait[] = [{ id: 12, name: 'Under 25 år' }];

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content>
                <SearchField
                    label="Kriterier"
                    description={<div>Søk etter kriterier her</div>}>
                    <SearchField.Input />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                <div>
                    {traits.map((trait, index) => {
                        return (
                            <div key={index} onClick={() => addTrait(trait)}>
                                {trait.name}
                            </div>
                        );
                    })}
                </div>
            </Modal.Content>
        </Modal>
    );
};
