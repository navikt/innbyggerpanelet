export interface IUser {
    name: string;
    latestUpdate: string;
    email: string;
    phone: string;
    candidate: ICandidate[];
}

export interface ICandidate {
    relevancyGrading: string;
    user: IUser;
    insight: IInsight;
}

export interface IInsight {
    [key: string]: string | Date | ICriteria[] | IConsent[] | ICandidate[]; // String indexation
    name: string;
    description: string;
    start: Date;
    end: Date;
    candidates: ICandidate[];
    criterias: ICriteria[];
    consents: IConsent[];
}

export interface IInsightProject {
    name: string;
    description: string;
    start: Date;
    end: Date;
    insights: IInsight[];
}

export interface IConsent {
    firstName: string;
    lastName: string;
    email: string;
    haveConsented: boolean;
    soundRecording: boolean;
    videoRecording: boolean;
}

export interface ICriteria {
    name: string;
    exclusivitySlug: string;
    criteriaCategories: ICriteriaCategory[];
}

export interface ICriteriaCategory {
    name: string;
    criterias: ICriteria[];
}
