import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { permittedCrossDomainPolicies } from 'helmet';
import { ChangeEvent, ReactElement, useState } from 'react';
import { createCriteria } from '../../api/mutations/mutateCriteria';

import style from './CriteriaAdminPanel.module.scss';

interface IProps {
    category: ICriteriaCategory;
    open: boolean;
    close: () => void;
}
export const CriteriaCreateModal = ({
    category,
    open,
    close,
}: IProps): ReactElement => {
    const [criteria, setCriteria] = useState<ICriteria>({
        id: 0,
        name: '',
        exclusivitySlug: '',
        category,
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newCriteria = { ...criteria };
        newCriteria[event.target.id] = event.target.value;
        setCriteria(newCriteria);
    };

    const submit = async () => {
        const { response, isLoading, isError } = await createCriteria(criteria);
        if (response) {
            close();
        } else if (isLoading) {
            setLoading(true);
        } else if (isError) {
            console.log(isError);
        }
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content>
                <div className={style.editModal}>
                    <Heading size="small">Nytt kriterie</Heading>
                    <BodyShort>Lag nytt kriterie i denne kategorien.</BodyShort>
                    <TextField
                        label="Navn"
                        id="name"
                        value={criteria.name}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Eklusivitet slug"
                        id="exclusivitySlug"
                        value={criteria.exclusivitySlug}
                        onChange={handleInputChange}
                        placeholder="none"
                    />
                    <TextField
                        label="Kategori"
                        value={criteria.category.name}
                        disabled
                    />
                    <Button
                        onClick={submit}
                        variant="primary"
                        loading={loading}>
                        Bekreft
                    </Button>
                </div>
            </Modal.Content>
        </Modal>
    );
};
