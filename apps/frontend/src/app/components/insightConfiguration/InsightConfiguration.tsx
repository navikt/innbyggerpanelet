import { ChangeEvent, FC, useState } from 'react';
import { Label, TextField, Textarea, Button } from '@navikt/ds-react';
import { Consent, Trait } from '@innbyggerpanelet/api-interfaces';
import { TraitsSearchModal } from './TraitsSearchModal';
import { ConsentsSearchModal } from './ConsentsSearchModal';

import style from './InsightConfiguration.module.scss';

interface IProps {
    id: number;
}

interface IFormControl {
    [key: string]: string | number | Trait[] | Consent[]; // String indexation
    name: string;
    description: string;
    numberOfCandidates: number;
    traits: Trait[];
    consents: Consent[];
}

const defaultFormControl: IFormControl = {
    name: '',
    description: '',
    numberOfCandidates: 5,
    traits: [],
    consents: [],
};

export const InsightConfiguration: FC<IProps> = ({ id }) => {
    const [values, setValues] = useState<IFormControl>(defaultFormControl);

    const [openTraits, setOpenTraits] = useState<boolean>(false);
    const [openConsents, setOpenConsents] = useState<boolean>(false);

    const handleInputChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const newValues = { ...values };
        newValues[event.target.id] = event.target.value;
        setValues(newValues);
    };

    const addTrait = (trait: Trait) => {
        const newValues = { ...values };
        newValues.traits = [...newValues.traits, trait];

        setValues(newValues);
    };

    const addConsent = (consent: Consent) => {
        const newValues = { ...values };
        newValues.consents = [...newValues.consents, consent];

        setValues(newValues);
    };

    const removeTrait = (trait: Trait) => {
        const newValues = { ...values };
        const filteredTraits = newValues.traits.filter(
            (item) => item.id !== trait.id
        );

        newValues.traits = filteredTraits;
        setValues(newValues);
    };

    const removeConsent = (consent: Consent) => {
        const newValues = { ...values };
        const filteredConsents = newValues.consents.filter(
            (item) => item.id !== consent.id
        );

        newValues.consents = filteredConsents;
        setValues(newValues);
    };

    return (
        <>
            <div className={style.wrapper}>
                <div className={style.insightInfo}>
                    <TextField
                        label="Navn"
                        id="name"
                        onChange={handleInputChange}
                        value={values.name}
                    />
                    <Textarea
                        label="Beskrivelse"
                        id="description"
                        onChange={handleInputChange}
                        value={values.description}
                    />
                    <TextField
                        label="Antall kandidater"
                        type="number"
                        id="numberOfCandidates"
                        onChange={handleInputChange}
                        value={values.numberOfCandidates}
                    />
                </div>
                <div className={style.insightSpecs}>
                    <div className={style.insightTraits}>
                        <Label size="medium" spacing>
                            Kriterier:
                        </Label>
                        {values.traits.map((trait, index) => {
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
                        {values.consents.map((consent, index) => {
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
