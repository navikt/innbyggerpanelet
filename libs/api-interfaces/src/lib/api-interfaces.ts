export interface ICandidate {
    id: number;
    name: string;
    traits: ITrait[];
}

export interface ITrait {
    id: number;
    name: string;
}

export interface IConsent {
    id: number;
    name: string;
}

// Needs Ref to project, and ID.
export interface IInsight {
    [key: string]:
        | string
        | number
        | Date
        | ITrait[]
        | IConsent[]
        | ICandidate[]; // String indexation
    name: string;
    description: string;
    starts: string;
    ends: string;
    candidates: ICandidate[];
    traits: ITrait[];
    consents: IConsent[];
}
