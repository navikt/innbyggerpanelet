export enum EnumUserRole {
    Citizen = 'CITIZEN',
    InsightWorker = 'INSIGHT_WORKER',
    Admin = 'ADMIN',
}

export interface IUser {
    [key: string]:
        | string
        | ICandidate[]
        | ICriteria[]
        | IInsightProject[]
        | boolean
        | undefined;
    id: string;
    firstname: string;
    surname: string;
    registered: boolean;
    role: EnumUserRole;
}

export interface ICitizen extends IUser {
    pnr: string;
    expirationDate?: string;
    phone: string;
    candidates: ICandidate[];
    criterias: ICriteria[];
}

export interface IEmployee extends IUser {
    email: string;
    insightProjects: IInsightProject[];
    ownerships: IInsightProject[];
}

export enum EnumCandidateStatus {
    Pending = 'PENDING',
    Completed = 'COMPLETED',
    Accepted = 'ACCEPTED',
    Declined = 'DECLINED',
}

export interface ICandidate {
    relevancyGrading: number;
    citizen: ICitizen;
    insight: IInsight;
    hasConsented: boolean;
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
    [key: string]: string | number | IUser[] | IUser | IInsight[] | undefined;
    id: number;
    name: string;
    description: string;
    owner?: IEmployee;
    members: IEmployee[];
    start: string;
    end: string;
}

export interface IConsent {
    template: IConsentTemplate;
    insight?: IInsight;
    justification?: string;
    required: boolean;
}

export interface IConsentTemplate {
    [key: string]: number | string | undefined;
    id?: number;
    title: string;
    description: string;
}

export interface ICriteria {
    [key: string]: number | string | ICriteriaCategory | undefined;

    id: number;
    name: string;
    exclusivitySlug?: string;
    category: ICriteriaCategory;
}

export interface ICriteriaCategory {
    [key: string]: number | string;

    id: number;
    name: string;
    description: string;
}

export interface IMessage {
    id: number;
    recipient: IUser;
    timestamp: string;
    title: string;
    description: string;
    read: boolean;
    ref?: string;
}
