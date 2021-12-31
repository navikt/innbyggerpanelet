export interface Message {
  message: string;
}

export interface Candidate {
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
    traits?: Trait[];
}

export interface Trait {
    id: number;
    name: string;
}

export interface Consent {
    id: number;
    name: string;
}

type insightTechnique = 'Intervju' | 'Lydopptak' | 'Videoopptak';

export interface Insight {
    name: string;
    insightTechnique: insightTechnique;
    description?: string;
    starts?: string;
    ends?: string;
    candidates?: Candidate[];
    traits?: Trait[];
    consents?: Consent[];
}