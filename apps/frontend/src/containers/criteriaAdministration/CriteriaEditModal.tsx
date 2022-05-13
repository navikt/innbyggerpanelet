import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { updateCriteria } from '../../api/mutations/mutateCriteria';
import { useErrorMessageDispatcher, useErrorMessageState } from '../../core/context/ErrorMessageContext';
import { validateCriteria } from '../../validation/criteria';
import style from './CriteriaAdminPanel.module.scss';

interface IProps {
    criteria: ICriteria;
    open: boolean;
    close: () => void;
    setCriteria: (criteria: ICriteria) => void;
}

// Can be refactored into an abstract modal for both patching and posting
// by turning heading and body into react children and adding a submit function prop.
export const CriteriaEditModal = ({ criteria, open, close, setCriteria }: IProps): ReactElement => {
    const [patching, setPatching] = useState(false);

    const errorMessageDispatch = useErrorMessageDispatcher();
    const errorMessages = useErrorMessageState();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCriteria = { ...criteria };
        newCriteria[event.target.id] = event.target.value;
        setCriteria(newCriteria);
    };

    const handleSubmit = async () => {
        setPatching(true);

        if (!validateCriteria(criteria).isValid)
            return errorMessageDispatch.setErrorMessages(validateCriteria(criteria).errorMessages);

        const { response, error } = await updateCriteria(criteria);

        if (response) {
            errorMessageDispatch.clearErrorMessages();
            close();
        } else if (error && error.response?.status === 406) {
            errorMessageDispatch.setErrorMessages({ nameErrorMsg: errorMessages.nameErrorMsg });
            setPatching(false);
        }
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="small">Rediger kriterie</Heading>
                <BodyShort className={style.editWarning}>
                    Vær obs på at å redigere enkelte kriterier kan få store konsekvenser for kandidatene.
                </BodyShort>
                <TextField label="Navn" value={criteria.name} id="name" onChange={handleChange} />
                <TextField
                    label="Eklusivitet slug"
                    value={criteria.exclusivitySlug}
                    id="exclusivitySlug"
                    placeholder="none"
                    onChange={handleChange}
                />
                <Button loading={patching} onClick={handleSubmit}>
                    Bekreft
                </Button>
            </Modal.Content>
        </Modal>
    );
};
