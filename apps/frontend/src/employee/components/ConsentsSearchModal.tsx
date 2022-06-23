import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { Modal, SearchField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useConsentSearchByDescription } from '../../api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './components.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addConsent: (consent: IConsent) => void;
}

export const ConsentsSearchModal = ({ open, close, addConsent }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { consents, loading, error } = useConsentSearchByDescription(search);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <SearchField label="Samtykker" description={<div>Søk etter samtykker her</div>}>
                    <SearchField.Input onChange={handleSearch} value={search} />
                    <SearchField.Button>Søk</SearchField.Button>
                </SearchField>
                <div>
                    {consents?.map((consent, index) => {
                        return (
                            <div key={index} className={style.result} onClick={() => addConsent(consent)}>
                                + {consent.description}
                            </div>
                        );
                    }) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    );
};
