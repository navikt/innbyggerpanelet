import { Modal, Search } from '@navikt/ds-react'
import React, { ReactElement, useState } from 'react'
import { useCriteriaSearchByName } from '../../api/hooks/useCriteria'
import { ICriteria } from '../../types'
import { APIHandler } from '../common/apiHandler/APIHandler'
import style from './Modals.module.scss'

interface IProps {
    open: boolean;
    close: () => void;
    addCriteria: (criteria: ICriteria) => void;
}

export const CriteriasSearchModal = ({ open, close, addCriteria }: IProps): ReactElement => {
    const [search, setSearch] = useState('')
    const { criterias, loading, error } = useCriteriaSearchByName(search)

    const handleSearch = (input: string) => {
        setSearch(input)
    }

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Search variant="simple" label="Kriterier" onChange={handleSearch} value={search} />
                <div className={style.results}>
                    {criterias?.map((criteria: ICriteria, index: number) => {
                        return (
                            <div key={index} className={style.result} onClick={() => addCriteria(criteria)}>
                                + {criteria.name}
                            </div>
                        )
                    }) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    )
}
