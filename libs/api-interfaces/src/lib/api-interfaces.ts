export interface Message {
  message: string;
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
        | insightTechnique
        | number
        | Date
        | ICriteria[]
        | IConsent[]
        | ICandidate[]; // String indexation
    name: string;
    insightTechnique: insightTechnique;
    description: string;
    starts: string;
    ends: string;
    candidates: ICandidate[];
    criterias: ICriteria[];
    consents: IConsent[];
}

type insightTechnique = 'Intervju' | 'Lydopptak' | 'Videoopptak';

