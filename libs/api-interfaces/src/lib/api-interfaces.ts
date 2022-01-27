export interface IUser {
    id: number;
    name: string;
    latestUpdate: string;
    email: string;
    phone: string;
    criterias: ICriteria[];
}

export enum EnumCandidateStatus {
    Pending = 'PENDING',
    Completed = 'COMPLETED',
    Accepted = 'ACCEPTED',
    Declined = 'DECLINED',
}

export interface ICandidate {
    relevancyGrading: number;
    user: IUser;
    insight: IInsight;
    status: EnumCandidateStatus;
}

export interface IInsight {
    [key: string]:
        | string
        | number
        | Date
        | ICriteria[]
        | IConsent[]
        | ICandidate[]
        | IInsightProject; // String indexation
    id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    criterias: ICriteria[];
    consents: IConsent[];
    project: IInsightProject;
}

export interface IInsightProject {
    [key: string]: string | number | IUser[] | IInsight[];
    id: number;
    name: string;
    description: string;
    members: IUser[];
    start: string;
    end: string;
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
    category: ICriteriaCategory;
}

export interface ICriteriaCategory {
    id: number;
    name: string;
    description: string;
}
