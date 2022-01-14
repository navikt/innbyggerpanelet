export interface ICandidate {
    id: number;
    name: string;
    criterias: ICriteria[];
}

export interface ICriteria {
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
        | ICriteria[]
        | IConsent[]
        | ICandidate[]; // String indexation
    name: string;
    description: string;
    starts: string;
    ends: string;
    candidates: ICandidate[];
    criterias: ICriteria[];
    consents: IConsent[];
}
