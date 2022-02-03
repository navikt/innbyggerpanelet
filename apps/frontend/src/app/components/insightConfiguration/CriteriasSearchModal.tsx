import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Loader, Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useCriteriaSearchByName } from '../../api/hooks/useCriteria';
import { mocks } from '../../utils/mocks';
import { APIError } from '../misc/apiError/APIError';

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
    const [search, setSearch] = useState('');
    const { criterias, isLoading, isError } = useCriteriaSearchByName(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    if (isError) return <APIError error={isError} />;

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.wrapper}>
                <SearchField
                    label="Kriterier"
                    description={<div>Søk etter kriterier her</div>}>
                    <SearchField.Input onChange={handleSearch} value={search} />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                {isLoading || !criterias ? (
                    <Loader />
                ) : (
                    <div className={style.results}>
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
                )}
            </Modal.Content>
        </Modal>
    );
};
