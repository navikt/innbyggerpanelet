import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Panel, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConsentTemplateById } from '../../common/api/hooks';
import { disableConsentTemplate, updateConsentTemplate } from '../../common/api/mutations';
import { APIHandler } from '../../common/components/apiHandler';
import { useFormatValidationErrors } from '../../common/hooks';
import style from './EditConsentTemplateAdministration.module.scss';

const defaultConsentTemplate: IConsentTemplate = {
    title: '',
    description: '',
    newest: true,
    version: 0
};

export const EditConsentTemplateAdministration = (): ReactElement => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { consentTemplate, loading, error } = useConsentTemplateById(id);

    const [updatedConsentTemplate, setUpdatedConsentTemplate] = useState<IConsentTemplate>(defaultConsentTemplate);
    const [consentTemplateValidationErrors, setConsentTemplateValidationErrors] = useFormatValidationErrors();

    useEffect(() => {
        if (consentTemplate) setUpdatedConsentTemplate(consentTemplate);
    }, [consentTemplate]);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newConsentTemplate = { ...updatedConsentTemplate };
        newConsentTemplate[event.target.id] = event.target.value;
        setUpdatedConsentTemplate(newConsentTemplate);
    };

    const handleSubmit = async () => {
        const { response, validationErrors, error } = await updateConsentTemplate(updatedConsentTemplate);
        if (error) throw new Error('Failed to post consent template.');
        if (validationErrors) setConsentTemplateValidationErrors(validationErrors);
        if (response) navigate('/admin/samtykker');
    };

    const handleDisable = async () => {
        const { response, validationErrors, error } = await disableConsentTemplate(updatedConsentTemplate);
        if (error) throw new Error('Failed to disable consent template');
        if (validationErrors) setConsentTemplateValidationErrors(validationErrors);
        if (response) navigate('/admin/samtykker');
    };

    return (
        <Panel className={style.wrapper}>
            {updatedConsentTemplate ? (
                <>
                    <Heading size="xlarge">Rediger samtykkemal</Heading>
                    <TextField
                        label="Tittel"
                        id="title"
                        error={consentTemplateValidationErrors.title}
                        value={updatedConsentTemplate.title}
                        onChange={handleChange}
                    />
                    <Textarea
                        label="Beskrivelse"
                        id="description"
                        error={consentTemplateValidationErrors.description}
                        value={updatedConsentTemplate.description}
                        onChange={handleChange}
                    />
                    <div className={style.buttons}>
                        <Link to="/admin/samtykker">
                            <Button as="div" variant="danger">
                                Avbryt
                            </Button>
                        </Link>
                        <Button onClick={handleSubmit}>Bekreft oppdatering</Button>
                    </div>
                    <Button onClick={handleDisable} variant="danger">
                        Slett samtykkemal
                    </Button>
                </>
            ) : (
                <APIHandler loading={loading} error={error} />
            )}
        </Panel>
    );
};
