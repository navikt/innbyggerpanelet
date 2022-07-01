import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Modal, Search } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useCriteriaSearchByName } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './Modals.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addCriteria: (criteria: ICriteria) => void;
}

export const CriteriasSearchModal = ({ open, close, addCriteria }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { criterias, loading, error } = useCriteriaSearchByName(search);

    const handleSearch = (input: string) => {
        setSearch(input);
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Search variant="simple" label="Kriterier" onChange={handleSearch} value={search} />
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
