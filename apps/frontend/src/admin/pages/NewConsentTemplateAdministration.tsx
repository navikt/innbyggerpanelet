import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { Button, Heading, Panel, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createConsentTemplate } from '../../common/api/mutations';
import { useFormatValidationErrors } from '../../common/hooks';
import style from './NewConsentTemplateAdministration.module.scss';

const defaultConsentTemplate: IConsentTemplate = {
    title: '',
    description: '',
    newest: true,
    version: 1
};

export const NewConsentTemplateAdministration = (): ReactElement => {
    const navigate = useNavigate();

    const [consentTemplate, setConsentTemplate] = useState<IConsentTemplate>(defaultConsentTemplate);
    const [consentTemplateValidationErrors, setConsentTemplateValidationErrors] = useFormatValidationErrors();

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newConsentTemplate = { ...consentTemplate };
        newConsentTemplate[event.target.id] = event.target.value;
        setConsentTemplate(newConsentTemplate);
    };

    const handleSubmit = async () => {
        const { response, validationErrors, error } = await createConsentTemplate(consentTemplate);
        if (error) throw new Error('Failed to post consent template.');
        if (validationErrors) setConsentTemplateValidationErrors(validationErrors);
        if (response) navigate('/admin/samtykker');
    };

    return (
        <Panel className={style.wrapper}>
            <Heading size="xlarge">Ny samtykkemal</Heading>
            <TextField
                label="Tittel"
                id="title"
                error={consentTemplateValidationErrors.title}
                value={consentTemplate.title}
                onChange={handleChange}
            />
            <Textarea
                label="Beskrivelse"
                id="description"
                error={consentTemplateValidationErrors.description}
                value={consentTemplate.description}
                onChange={handleChange}
            />
            <div className={style.submit}>
                <Button onClick={handleSubmit}>Opprett samtykkemal</Button>
            </div>
        </Panel>
    );
};
