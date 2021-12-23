import { ChangeEvent, FC, useState } from 'react';
import { Label, TextField, Textarea, Button } from '@navikt/ds-react';
import { Consent, Insight, Trait } from '@innbyggerpanelet/api-interfaces';
import { TraitsSearchModal } from './TraitsSearchModal';
import { ConsentsSearchModal } from './ConsentsSearchModal';

import style from './InsightConfiguration.module.scss';

interface IProps {
    insight: Insight;
    setInsight: (insight: Insight) => void;
}

export const InsightConfiguration: FC<IProps> = ({ insight, setInsight }) => {
    const [openTraits, setOpenTraits] = useState<boolean>(false);
    const [openConsents, setOpenConsents] = useState<boolean>(false);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newInsight = { ...insight };
        newInsight[event.target.id] = event.target.value;
        setInsight(newInsight);
    };

    const addTrait = (trait: Trait) => {
        const newInsight = { ...insight };
        newInsight.traits = [...newInsight.traits, trait];

        setInsight(newInsight);
    };

    const addConsent = (consent: Consent) => {
        const newInsight = { ...insight };
        newInsight.consents = [...newInsight.consents, consent];

        setInsight(newInsight);
    };

    const removeTrait = (trait: Trait) => {
        const newInsight = { ...insight };
        const filteredTraits = newInsight.traits.filter(
            (item) => item.id !== trait.id
        );

        newInsight.traits = filteredTraits;
        setInsight(newInsight);
    };

    const removeConsent = (consent: Consent) => {
        const newInsight = { ...insight };
        const filteredConsents = newInsight.consents.filter(
            (item) => item.id !== consent.id
        );

        newInsight.consents = filteredConsents;
        setInsight(newInsight);
    };

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.insightInfo}>
                    <TextField
                        label="Navn"
                        id="name"
                        onChange={handleInputChange}
                        value={insight.name}
                    />
                    <Textarea
                        label="Beskrivelse"
                        id="description"
                        onChange={handleInputChange}
                        value={insight.description}
                    />
                    <TextField
                        label="Antall kandidater"
                        type="number"
                        id="numberOfCandidates"
                        value={insight.candidates.length}
                        disabled
                    />
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
