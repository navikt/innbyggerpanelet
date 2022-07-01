import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { Modal, Search } from '@navikt/ds-react';
import { ReactElement, useState } from 'react';
import { useConsentTemplateSearchByTitle } from '../../common/api/hooks';
import { APIHandler } from '../../common/components/apiHandler';
import style from './Modals.module.scss';

interface IProps {
    open: boolean;
    close: () => void;
    addConsent: (template: IConsentTemplate) => void;
}

export const ConsentsSearchModal = ({ open, close, addConsent }: IProps): ReactElement => {
    const [search, setSearch] = useState('');
    const { consentTemplates, loading, error } = useConsentTemplateSearchByTitle(search);

    const handleSearch = (input: string) => {
        setSearch(input);
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.modalContentWrapper}>
                <Search variant="simple" label="Samtykker" onChange={handleSearch} value={search} />
                <div>
                    {consentTemplates?.map((template, index) => {
                        return (
                            <div key={index} className={style.result} onClick={() => addConsent(template)}>
                                + {template.title}: {template.description}
                            </div>
                        );
                    }) || <APIHandler error={error} loading={loading} />}
                </div>
            </Modal.Content>
        </Modal>
    );
};
