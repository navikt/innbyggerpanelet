import { IConsent, ICriteria, IInsight } from '@innbyggerpanelet/api-interfaces';
import { Datepicker } from '@navikt/ds-datepicker';
import { DatepickerValue } from '@navikt/ds-datepicker/lib/Datepicker';
import '@navikt/ds-datepicker/lib/index.css';
import { AddCircle, Close } from '@navikt/ds-icons';
import { BodyShort, Label, Textarea, TextField } from '@navikt/ds-react';
import { ChangeEvent, ReactElement, useState } from 'react';
import { ConsentsSearchModal } from './ConsentsSearchModal';
import { CriteriasSearchModal } from './CriteriasSearchModal';
import style from './InsightConfiguration.module.scss';

interface IProps {
    insight: IInsight;
    setInsight: (insight: IInsight) => void;
}

export const InsightConfiguration = ({ insight, setInsight }: IProps): ReactElement => {
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

    const addConsent = (consent: IConsent) => {
        const newInsight = { ...insight };
        newInsight.consents = [...newInsight.consents, consent];

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
        const filteredConsents = newInsight.consents.filter((item) => item.id !== consent.id);

        newInsight.consents = filteredConsents;
        setInsight(newInsight);
    };

    // This block of code is entirely too big, the insightcriterias and insightConsent css classes should be separated into components.
    // Should also look into using the @navikt/date-picker. Currently the onChange prop does not handle event as a parameter.
    return (
        <>
            <div className={style.wrapper}>
                <TextField id="name" label="Tittel" onChange={handleInputChange} value={insight.name} />
                <Textarea
                    id="description"
                    label="Formål med innsiktsarbeid"
                    onChange={handleInputChange}
                    value={insight.description}
                />
                <div>
                    <Label>Innsiktsperiode</Label>
                    <div className={style.dates}>
                        <Datepicker value={insight.start} onChange={(value) => handleDateChange(value, 'start')} />
                        <BodyShort>til</BodyShort>
                        <Datepicker value={insight.end} onChange={(value) => handleDateChange(value, 'end')} />
                    </div>
                </div>
                <div>
                    <Label className={style.listHeader} size="medium" spacing>
                        Kriterier <AddCircle onClick={() => setOpenCriterias(true)} />
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
                </div>
                <div>
                    <Label className={style.listHeader} size="medium" spacing>
                        Samtykker <AddCircle onClick={() => setOpenConsents(true)} />
                    </Label>
                    {insight.consents.map((consent, index) => {
                        return (
                            <div className={style.listItem}>
                                <div key={index}>{consent.description}</div>
                                <Close onClick={() => removeConsent(consent)} />
                            </div>
                        );
                    })}
                    {insight.consents.length === 0 ? <BodyShort>Ingen valgte...</BodyShort> : null}
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
