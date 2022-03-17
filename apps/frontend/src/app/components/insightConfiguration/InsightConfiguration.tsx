import { ChangeEvent, ReactElement, useState } from 'react';
import { Label, TextField, Textarea, Button } from '@navikt/ds-react';
import {
    IConsent,
    IInsight,
    ICriteria,
} from '@innbyggerpanelet/api-interfaces';
import { CriteriasSearchModal } from './CriteriasSearchModal';
import { ConsentsSearchModal } from './ConsentsSearchModal';

import style from './InsightConfiguration.module.scss';

interface IProps {
    insight: IInsight;
    setInsight: (insight: IInsight) => void;
}

export const InsightConfiguration = ({
    insight,
    setInsight,
}: IProps): ReactElement => {
    const [openCriterias, setOpenCriterias] = useState<boolean>(false);
    const [openConsents, setOpenConsents] = useState<boolean>(false);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newInsight = { ...insight };
        newInsight[event.target.id] = event.target.value;
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
        const filteredcriterias = newInsight.criterias.filter(
            (item) => item.id !== criteria.id
        );

        newInsight.criterias = filteredcriterias;
        setInsight(newInsight);
    };

    const removeConsent = (consent: IConsent) => {
        const newInsight = { ...insight };
        const filteredConsents = newInsight.consents.filter(
            (item) => item.id !== consent.id
        );

        newInsight.consents = filteredConsents;
        setInsight(newInsight);
    };

    // This block of code is entirely too big, the insightcriterias and insightConsent css classes should be separated into components.
    // Should also look into using the @navikt/date-picker. Currently the onChange prop does not handle event as a parameter.
    return (
        <>
            <div className={style.wrapper}>
                <div className={style.insightInfo}>
                    <TextField
                        id="name"
                        label="Navn"
                        onChange={handleInputChange}
                        value={insight.name}
                    />
                    <Textarea
                        id="description"
                        label="Beskrivelse"
                        onChange={handleInputChange}
                        value={insight.description}
                    />
                    <div className={style.dates}>
                        <TextField
                            id="start"
                            label="Startdato"
                            placeholder="DD-MM-ÅÅÅÅ"
                            onChange={handleInputChange}
                            value={insight.start}
                        />
                        <TextField
                            id="end"
                            label="Sluttdato"
                            placeholder="DD-MM-ÅÅÅÅ"
                            onChange={handleInputChange}
                            value={insight.end}
                        />
                    </div>
                </div>
                <div className={style.insightSpecs}>
                    <div className={style.insightcriterias}>
                        <Label size="medium" spacing>
                            Kriterier:
                        </Label>
                        {insight.criterias.map((criteria, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => removecriteria(criteria)}>
                                    {criteria.name}
                                </div>
                            );
                        })}
                        <Button
                            size="small"
                            onClick={() => setOpenCriterias(true)}>
                            + Legg til kriterie
                        </Button>
                    </div>
                    <div className={style.insightConsents}>
                        <Label size="medium" spacing>
                            Samtykker:
                        </Label>
                        {insight.consents.map((consent, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => removeConsent(consent)}>
                                    {consent.description}
                                </div>
                            );
                        })}
                        <Button
                            size="small"
                            onClick={() => setOpenConsents(true)}>
                            + Legg til samtykke
                        </Button>
                    </div>
                </div>
            </div>
            <CriteriasSearchModal
                open={openCriterias}
                close={() => setOpenCriterias(false)}
                addCriteria={addcriteria}
            />
            {
                // TODO Devide if it only should be possible to add a single consent?
            }
            <ConsentsSearchModal
                open={openConsents}
                close={() => setOpenConsents(false)}
                addConsent={addConsent}
            />
        </>
    );
};
