export interface ICandidate {
    id: number;
    name: string;
    age: number;
    motherTounge: string;
    education: 'Barneskole' | 'Ungdomsskole' | 'Videregående' | 'Høyskole/Universitet' | 'Ingen';
    benefits?: string;
    handicap?: string;
    assistiveTechnology?: string;
    digitalSkills: 'Dårlig' | 'Gjennomsnittelig' | 'Bra';
    employed: boolean;
    industry?: string;
    criterias: ICriteria[];
}

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

