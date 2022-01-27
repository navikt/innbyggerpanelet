import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { ReactElement } from 'react';
import { mocks } from '../../utils/mocks';

import style from './SearchModal.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addCriteria: (criteria: ICriteria) => void;
}

export const CriteriasSearchModal = ({
    open,
    close,
    addCriteria,
}: IProps): ReactElement => {
    // Query API for results
    // Remove item on click
    const criterias: ICriteria[] = mocks.allCriterias;

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
                    {criterias.map((criteria, index) => {
                        return (
                            <div
                                key={index}
                                className={style.result}
                                onClick={() => addCriteria(criteria)}>
                                + {criteria.name}
                            </div>
                        );
                    })}
                </div>
            </Modal.Content>
        </Modal>
    );
};
