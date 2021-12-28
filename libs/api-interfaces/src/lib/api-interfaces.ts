export interface Candidate {
    id: number;
    name: string;
    traits: Trait[];
}

export interface Trait {
    id: number;
    name: string;
}

export interface Consent {
    id: number;
    name: string;
}

// Needs Ref to project, and ID.
export interface Insight {
    [key: string]: string | number | Date | Trait[] | Consent[] | Candidate[]; // String indexation
    name: string;
    description: string;
    starts: string;
    ends: string;
    candidates: Candidate[];
    traits: Trait[];
    consents: Consent[];
}
