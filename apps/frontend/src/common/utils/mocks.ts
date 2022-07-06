import {
    EnumCandidateStatus,
    EnumUserRole,
    ICandidate,
    ICitizen,
    IConsent,
    IConsentTemplate,
    ICriteria,
    ICriteriaCategory,
    IEmployee,
    IInsight,
    IInsightProject,
    IUser
} from '@innbyggerpanelet/api-interfaces';

const allCriteriaCategories: ICriteriaCategory[] = [
    {
        id: 1,
        name: 'Alder',
        description: 'Kandidatens aldergruppe.'
    },
    {
        id: 2,
        name: 'Hjelpemidler',
        description: 'Utvalg av mulige hjelpemidler tatt i bruk av kandidat.'
    }
];

const allCriterias: ICriteria[] = [
    {
        id: 1,
        name: 'Mellom 18 og 25 år',
        category: allCriteriaCategories[0],
        exclusivitySlug: 'age'
    },
    {
        id: 2,
        name: 'Mellom 26 og 35 år',
        category: allCriteriaCategories[0],
        exclusivitySlug: 'age'
    },
    { id: 3, name: 'Skjermoppleser', category: allCriteriaCategories[1] },
    { id: 4, name: 'Rullestol', category: allCriteriaCategories[1] }
];

const allConsentTemplates: IConsentTemplate[] = [
    {
        id: 1,
        title: 'Samtykker til skjermopptak',
        description:
            'Testkandidaten samtykker til av utfører at testen kan bruke programvare for å gjøre opptak av skjermen under testen.'
    }
];

const allConsents: IConsent[] = [{ template: allConsentTemplates[0], required: true }];

const teamMember: IEmployee = {
    id: '3',
    email: 'terje@nav.no',
    role: EnumUserRole.InsightWorker,
    criterias: [],
    registered: true,
    insightProjects: [],
    firstname: 'Terje',
    surname: 'Navansatt'
};

const primaryProject: IInsightProject = {
    id: 1,
    name: 'Primært prosjekt',
    description: 'Primært prosjektbeskrivelse',
    start: '01.12.2021',
    end: '01.04.2021',
    members: [teamMember]
};

const primaryInsight: IInsight = {
    id: 1,
    name: 'Primærtest',
    description: 'Primærtest beskrivelse',
    project: primaryProject,
    start: '01.01.2022',
    end: '21.01.2022',
    criterias: [allCriterias[0], allCriterias[2]],
    consents: [allConsents[0]]
};

const olaUser: ICitizen = {
    id: '1',
    firstname: 'Ola',
    surname: 'Nordmann',
    phone: '12332123',
    role: EnumUserRole.Citizen,
    expirationDate: '21.01.2025',
    registered: true,
    criterias: [allCriterias[0], allCriterias[2]],
    pnr: '22031112345',
    candidates: []
};

const olaCandidatures: ICandidate[] = [
    {
        citizen: olaUser,
        insight: primaryInsight,
        hasConsented: true,
        relevancyGrading: 0.8,
        status: EnumCandidateStatus.Completed
    }
];

const kariUser: ICitizen = {
    id: '2',
    phone: '32132321',
    expirationDate: '2023-01-02',
    criterias: [allCriterias[1], allCriterias[3]],
    pnr: '13046709835',
    registered: true,
    role: EnumUserRole.Citizen,
    candidates: [],
    firstname: 'Kari',
    surname: 'Nordmann'
};

const allUsers: IUser[] = [olaUser, kariUser];

export const mocks = {
    allCriteriaCategories,
    allCriterias,
    allConsents,
    primaryProject,
    primaryInsight,
    olaUser,
    olaCandidatures,
    kariUser,
    allUsers
};
