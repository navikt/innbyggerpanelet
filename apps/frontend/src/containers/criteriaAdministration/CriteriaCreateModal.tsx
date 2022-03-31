import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { validateCriteria } from '../../validation/criteria';
import { createCriteria } from '../../api/mutations/mutateCriteria';
import style from './CriteriaAdminPanel.module.scss';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';

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

    const [posting, setPosting] = useState(false);

    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCriteria = { ...criteria };
        newCriteria[event.target.id] = event.target.value;
        setCriteria(newCriteria);
    };

    const handleSubmit = async () => {
        if (validateCriteria(criteria).isValid) {
            const { response, isLoading, isError } = await createCriteria(criteria);
            if (response) {
                errorMessageDispatch.clearErrorMessages();
                close();
            } else if (isLoading) {
                setPosting(true);
            } else if (isError) {
                console.error(isError);
            }
        } else {
            errorMessageDispatch.setErrorMessages(validateCriteria(criteria).errorMessages);
        }
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
                    error={errorMessages.nameErrorMsg}
                />
                <TextField
                    label="Eklusivitet slug"
                    id="exclusivitySlug"
                    value={criteria.exclusivitySlug}
                    onChange={handleInputChange}
                    placeholder="none"
                />
                <TextField label="Kategori" value={criteria.category.name} disabled />
                <Button onClick={handleSubmit} variant="primary" loading={posting}>
                    Bekreft
                </Button>
            </Modal.Content>
        </Modal>
    );
};
