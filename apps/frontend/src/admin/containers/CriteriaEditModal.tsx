import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { BodyShort, Button, Heading, Modal, Switch, TextField } from '@navikt/ds-react';
import { AxiosError } from 'axios';
import { ChangeEvent, ReactElement, useState } from 'react';
import { updateCriteria } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks/';
import style from './Modals.module.scss';

interface IProps {
    criteria: ICriteria;
    open: boolean;
    close: () => void;
    setCriteria: (criteria: ICriteria) => void;
}

// Can be refactored into an abstract modal for both patching and posting
// by turning heading and body into react children and adding a submit function prop.
export const CriteriaEditModal = ({ criteria, open, close, setCriteria }: IProps): ReactElement => {
    const [criteriaValidationErrors, setCriteriaValidationErrors] = useFormatValidationErrors();
    const [putError, setPutError] = useState<AxiosError>();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newCriteria = { ...criteria };
        newCriteria[event.target.id] = event.target.value;
        setCriteria(newCriteria);
    };

    const handleSubmit = async () => {
        const { response, error, validationErrors } = await updateCriteria(criteria);
        if (error) return setPutError(error);
        if (validationErrors) return setCriteriaValidationErrors(validationErrors);
        if (response) close();
    };

    return (
        <Modal open={open} onClose={close}>
            <Modal.Content className={style.editModal}>
                <Heading size="small">Rediger kriterie</Heading>
                <BodyShort className={style.editWarning}>
                    Vær obs på at å redigere enkelte kriterier kan få store konsekvenser for kandidatene.
                </BodyShort>
                <TextField
                    label="Navn"
                    value={criteria.name}
                    id="name"
                    onChange={handleInputChange}
                    error={criteriaValidationErrors.name}
                />
                <TextField
                    label="Eklusivitet slug"
                    value={criteria.exclusivitySlug}
                    id="exclusivitySlug"
                    placeholder="none"
                    onChange={handleInputChange}
                />
                <Switch
                    size="medium"
                    position="left"
                    id="disabled"
                    checked={criteria.disabled}
                    onChange={(e) => setCriteria({ ...criteria, disabled: e.target.checked })}
                >
                    Ikke i bruk
                </Switch>
                {putError && <APIHandler loading={false} error={putError} />}
                <Button onClick={handleSubmit}>Bekreft</Button>
            </Modal.Content>
        </Modal>
    );
};
