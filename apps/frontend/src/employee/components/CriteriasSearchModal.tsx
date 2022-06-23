import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useCriteriaSearchByName } from '../../api/hooks/useCriteria';
import { APIHandler } from '../../common/components/apiHandler';
import style from './components.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addCriteria: (criteria: ICriteria) => void;
}

export const CriteriasSearchModal = ({ open, close, addCriteria }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { criterias, loading, error } = useCriteriaSearchByName(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <SearchField label="Kriterier" description={<div>Søk etter kriterier her</div>}>
                    <SearchField.Input onChange={handleSearch} value={search} />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                <div className={style.results}>
                    {criterias?.map((criteria, index) => {
                        return (
                            <div key={index} className={style.result} onClick={() => addCriteria(criteria)}>
                                + {criteria.name}
                            </div>
                        );
                    }) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    );
};
