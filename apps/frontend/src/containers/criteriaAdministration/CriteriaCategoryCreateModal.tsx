import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { validateCriteriaCategory } from '../../validation/criteriaCategory';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { createCriteriaCategory } from '../../api/mutations/mutateCriteriaCategory';
import style from './CriteriaAdminPanel.module.scss';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';

interface IProps {
    open: boolean;
    close: () => void;
}

const defaultCategory: ICriteriaCategory = {
    id: 0,
    name: '',
    description: ''
};

export const CriteriaCategoryCreateModal = ({ open, close }: IProps): ReactElement => {
    const [category, setCategory] = useState<ICriteriaCategory>(defaultCategory);
    const [posting, setPosting] = useState(false);

    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...category };
        result[event.target.id] = event.target.value;
        setCategory(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (validateCriteriaCategory(category).isValid) {
            setPosting(true);

            const { response, isError } = await createCriteriaCategory(category);

            if (response) {
                setPosting(false);
                errorMessageDispatch.clearErrorMessages();
                close();
            } else if (isError) {
                console.error(isError);
            }
        } else {
            errorMessageDispatch.setErrorMessages(validateCriteriaCategory(category).errorMessages);
        }
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="small">Ny kategori</Heading>
                <BodyShort>Lag en ny kategori.</BodyShort>
                <TextField 
                    label="Navn" 
                    id="name" 
                    value={category.name} 
                    onChange={handleChange}
                    error={errorMessages.nameErrorMsg}
                />
                <TextField 
                    label="Beskrivelse" 
                    id="description" 
                    value={category.description} 
                    onChange={handleChange} 
                    error={errorMessages.descriptionErrorMsg}
                />
                <Button onClick={handleSubmit} loading={posting}>
                    Opprett
                </Button>
            </Modal.Content>
        </Modal>
    );
};
