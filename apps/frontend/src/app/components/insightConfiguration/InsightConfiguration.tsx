import { ChangeEvent, FC, useState } from "react";
import {TextField, Textarea, Button} from "@navikt/ds-react";

import style from "./InsightConfiguration.module.scss";
import { Consent, Trait } from "@innbyggerpanelet/api-interfaces";

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
    name: "",
    description: "",
    numberOfCandidates: 5,
    traits: [],
    consents: []
}

export const InsightConfiguration: FC<IProps> = ({id}) => {
    const [values, setValues] = useState<IFormControl>(defaultFormControl);

    const [traitInputs, setTraitInputs] = useState<HTMLSelectElement[]>([]);
    const [consentInputs, setConsentInputs] = useState<HTMLSelectElement[]>([]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValues = {...values};         
        newValues[event.target.id] = event.target.value;
        setValues(newValues);
    }

    const addListInput = () => {
        /* 
            Add new ned list item to either traits or consents
        */ 
    }

    const removeListInput = () => {
        /*
            Remove list item from either traits or consents 
        */ 
    }

    return (<div className={style.wrapper}>
        <div className={style.insightInfo}>
            <TextField label="Navn" id="name" onChange={handleInputChange} value={values.name}/>
            <Textarea label="Beskrivelse" id="description" onChange={handleInputChange} value={values.description}/>
            <TextField label="Antall kandidater" type="number" id="numberOfCandidates" onChange={handleInputChange} value={values.numberOfCandidates}/>
        </div>
        <div className={style.insightSpecs}>
            <div className={style.insightTraits}>
                {traitInputs}
                <Button size="small">+ Legg til kriterie</Button>
            </div>
            <div className={style.insightConsents}>
                {consentInputs}
                <Button size="small">+ Legg til samtykke</Button>
            </div>
        </div>
    </div>)
}