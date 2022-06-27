import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, MouseEvent, ReactElement, useState } from 'react';
import { createCriteriaCategory } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks';
import style from './Modals.module.scss';

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
    const [categoryValidationErrors, setCategoryValidationErrors] = useFormatValidationErrors();
    const [postError, setPostError] = useState<AxiosError>();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = { ...category };
        result[event.target.id] = event.target.value;
        setCategory(result);
    };

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const { response, error, validationErrors } = await createCriteriaCategory(category);
        if (error) return setPostError(error);
        if (validationErrors) return setCategoryValidationErrors(validationErrors);
        if (response) close();
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
                    error={categoryValidationErrors.name}
                />
                <TextField
                    label="Beskrivelse"
                    id="description"
                    value={category.description}
                    onChange={handleChange}
                    error={categoryValidationErrors.description}
                />
                {postError && <APIHandler loading={false} error={postError} />}
                <Button onClick={handleSubmit}>Opprett</Button>
            </Modal.Content>
        </Modal>
    );
};
