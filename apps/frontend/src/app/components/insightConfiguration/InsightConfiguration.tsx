import { ChangeEvent, ReactElement, useState } from 'react';
import { Label, TextField, Textarea, Button } from '@navikt/ds-react';
import { IConsent, IInsight, ITrait } from '@innbyggerpanelet/api-interfaces';
import { TraitsSearchModal } from './TraitsSearchModal';
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
    const [openTraits, setOpenTraits] = useState<boolean>(false);
    const [openConsents, setOpenConsents] = useState<boolean>(false);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newInsight = { ...insight };
        newInsight[event.target.id] = event.target.value;
        setInsight(newInsight);
    };

    const addTrait = (trait: ITrait) => {
        const newInsight = { ...insight };
        newInsight.traits = [...newInsight.traits, trait];

        setInsight(newInsight);
    };

    const addConsent = (consent: IConsent) => {
        const newInsight = { ...insight };
        newInsight.consents = [...newInsight.consents, consent];

        setInsight(newInsight);
    };

    const removeTrait = (trait: ITrait) => {
        const newInsight = { ...insight };
        const filteredTraits = newInsight.traits.filter(
            (item) => item.id !== trait.id
        );

        newInsight.traits = filteredTraits;
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

    // This block of code is entirely too big, the insightTraits and insightConsent css classes should be separated into components.
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
                            id="starts"
                            label="Startdato"
                            placeholder="DD-MM-ÅÅÅÅ"
                            onChange={handleInputChange}
                            value={insight.starts}
                        />
                        <TextField
                            id="ends"
                            label="Sluttdato"
                            placeholder="DD-MM-ÅÅÅÅ"
                            onChange={handleInputChange}
                            value={insight.ends}
                        />
                    </div>
                </div>
                <div className={style.insightSpecs}>
                    <div className={style.insightTraits}>
                        <Label size="medium" spacing>
                            Kriterier:
                        </Label>
                        {insight.traits.map((trait, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => removeTrait(trait)}>
                                    {trait.name}
                                </div>
                            );
                        })}
                        <Button
                            size="small"
                            onClick={() => setOpenTraits(true)}>
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
                                    {consent.name}
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
            <TraitsSearchModal
                open={openTraits}
                close={() => setOpenTraits(false)}
                addTrait={addTrait}
            />
            <ConsentsSearchModal
                open={openConsents}
                close={() => setOpenConsents(false)}
                addConsent={addConsent}
            />
        </>
    );
};
