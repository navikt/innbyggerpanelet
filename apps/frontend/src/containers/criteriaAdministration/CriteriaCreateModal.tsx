import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { createCriteria } from '../../api/mutations/mutateCriteria';
import { useValidationErrors } from '../../core/hooks/useValidationErrors';
import style from './CriteriaAdminPanel.module.scss';

interface IProps {
    category: ICriteriaCategory;
    open: boolean;
    close: () => void;
}

export const CriteriaCreateModal = ({ category, open, close }: IProps): ReactElement => {
    const [criteria, setCriteria] = useState<ICriteria>({
        id: 0,
        name: '',
        exclusivitySlug: '',
        category
    });
    const [criteriaValidationErrors, setCriteriaValidationErrors] = useValidationErrors();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCriteria = { ...criteria };
        newCriteria[event.target.id] = event.target.value;
        setCriteria(newCriteria);
    };

    const handleSubmit = async () => {
        const { response, error, validationErrors } = await createCriteria(criteria);
        if (error) throw new Error('Failed to post criteria');
        if (validationErrors) return setCriteriaValidationErrors(validationErrors);
        if (response) close();
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="small">Nytt kriterie</Heading>
                <BodyShort>Lag nytt kriterie i denne kategorien.</BodyShort>
                <TextField
                    label="Navn"
                    id="name"
                    value={criteria.name}
                    onChange={handleInputChange}
                    error={criteriaValidationErrors.name}
                />
                <TextField
                    label="Eklusivitet slug"
                    id="exclusivitySlug"
                    value={criteria.exclusivitySlug}
                    onChange={handleInputChange}
                    placeholder="none"
                />
                <TextField label="Kategori" value={criteria.category.name} disabled />
                <Button onClick={handleSubmit} variant="primary">
                    Bekreft
                </Button>
            </Modal.Content>
        </Modal>
    );
};
