import { IConsent, IConsentTemplate, ICriteria, IInsight } from '@innbyggerpanelet/api-interfaces';
import { Datepicker } from '@navikt/ds-datepicker';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import { Close, Search } from '@navikt/ds-icons';
import { BodyShort, Button, Label, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import ErrorList from '../../common/components/validation/ErrorList';
import { IValidationError } from '../../common/hooks';
import { ConsentsSearchModal, CriteriasSearchModal } from '../components';
import style from './EmployeeInsightConfiguration.module.scss';

interface IProps {
    insight: IInsight;
    setInsight: (insight: IInsight) => void;
    validationErrors: IValidationError;
}

export const EmployeeInsightConfiguration = ({ insight, setInsight, validationErrors }: IProps): ReactElement => {
    const [openCriterias, setOpenCriterias] = useState<boolean>(false);
    const [openConsents, setOpenConsents] = useState<boolean>(false);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newInsight = { ...insight };
        newInsight[event.target.id] = event.target.value;
        setInsight(newInsight);
    };

    const handleDateChange = (value: DatepickerValue, id: string) => {
        const newInsight = { ...insight };
        newInsight[id] = value;
        setInsight(newInsight);
    };

    const addcriteria = (criteria: ICriteria) => {
        const newInsight = { ...insight };
        newInsight.criterias = [...newInsight.criterias, criteria];

        setInsight(newInsight);
    };

    const addConsent = (consent: IConsentTemplate) => {
        const newInsight = { ...insight };
        newInsight.consents = [...newInsight.consents, { template: consent, required: true }];

        setInsight(newInsight);
    };

    const removecriteria = (criteria: ICriteria) => {
        const newInsight = { ...insight };
        const filteredcriterias = newInsight.criterias.filter((item) => item.id !== criteria.id);

        newInsight.criterias = filteredcriterias;
        setInsight(newInsight);
    };

    const removeConsent = (consent: IConsent) => {
        const newInsight = { ...insight };
        const filteredConsents = newInsight.consents.filter((item) => item.template.id !== consent.template.id);

        newInsight.consents = filteredConsents;
        setInsight(newInsight);
    };

    // This block of code is entirely too big, the insightcriterias and insightConsent css classes should be separated into components.
    // Should also look into using the @navikt/date-picker. Currently the onChange prop does not handle event as a parameter.
    return (
        <>
            <div className={style.wrapper}>
                <TextField
                    id="name"
                    label="Tittel"
                    onChange={handleInputChange}
                    value={insight.name}
                    error={validationErrors.name}
                />
                <Textarea
                    id="description"
                    label="Formål med innsiktsarbeid"
                    onChange={handleInputChange}
                    value={insight.description}
                    error={validationErrors.description}
                />
                <div>
                    <Label>Innsiktsperiode</Label>
                    <div className={style.dates}>
                        <Datepicker
                            value={insight.start}
                            label="Fra"
                            inputName="start"
                            onChange={(value) => handleDateChange(value, 'start')}
                        />
                        <BodyShort>til</BodyShort>
                        <Datepicker
                            value={insight.end}
                            label="Til"
                            inputName="end"
                            onChange={(value) => handleDateChange(value, 'end')}
                        />
                    </div>
                    {validationErrors.start && <ErrorList errorMessages={[...validationErrors.start]} />}
                    {validationErrors.end && <ErrorList errorMessages={[...validationErrors.end]} />}
                </div>
                <div className={style.propertyGroup}>
                    <Label size="medium" spacing>
                        Kriterier
                    </Label>
                    {insight.criterias.map((criteria, index) => {
                        return (
                            <div className={style.listItem}>
                                <div key={index}>{criteria.name}</div>
                                <Close onClick={() => removecriteria(criteria)} />
                            </div>
                        );
                    })}
                    {insight.criterias.length === 0 ? <BodyShort>Ingen valgte...</BodyShort> : null}
                    {validationErrors.criterias && <ErrorList errorMessages={[...validationErrors.criterias]} />}
                    <Button variant="secondary" onClick={() => setOpenCriterias(true)}>
                        <Search /> Søk etter kriterier
                    </Button>
                </div>
                <div className={style.propertyGroup}>
                    <Label size="medium" spacing>
                        Samtykker
                    </Label>
                    {insight.consents.map((consent, index) => {
                        return (
                            <div className={style.listItem}>
                                <div key={index}>{consent.template.title}</div>
                                <Close onClick={() => removeConsent(consent)} />
                            </div>
                        );
                    })}
                    {insight.consents.length === 0 ? <BodyShort>Ingen valgte...</BodyShort> : null}
                    {validationErrors.consents && <ErrorList errorMessages={[...validationErrors.consents]} />}
                    <Button variant="secondary" onClick={() => setOpenConsents(true)}>
                        <Search /> Søk etter samtykkemaler
                    </Button>
                </div>
            </div>

            <CriteriasSearchModal
                open={openCriterias}
                close={() => setOpenCriterias(false)}
                addCriteria={addcriteria}
            />
            <ConsentsSearchModal open={openConsents} close={() => setOpenConsents(false)} addConsent={addConsent} />
        </>
    );
};
