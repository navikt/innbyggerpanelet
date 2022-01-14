export interface IUser {
    id: number;
    name: string;
    latestUpdate: string;
    email: string;
    phone: string;
    candidatures?: ICandidate[];
    criterias: ICriteria[];
}

export interface ICandidate {
    relevancyGrading: number;
    user: IUser;
    insight: IInsight;
}

export interface IInsight {
    [key: string]:
        | string
        | number
        | Date
        | ICriteria[]
        | IConsent[]
        | ICandidate[]; // String indexation
    id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    candidates: ICandidate[];
    criterias: ICriteria[];
    consents: IConsent[];
}

export interface IInsightProject {
    id: number;
    name: string;
    description: string;
    start: Date;
    end: Date;
    insights: IInsight[];
}

export interface IConsent {
    id: number;
    description: string;
    /*
    firstName: string;
    lastName: string;
    email: string;
    haveConsented: boolean;
    soundRecording: boolean;
    videoRecording: boolean;*/
}

export interface ICriteria {
    id: number;
    name: string;
    exclusivitySlug?: string;
}

export interface ICriteriaCategory {
    id: number;
    name: string;
    description: string;
    criterias: ICriteria[];
}
