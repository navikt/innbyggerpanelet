import {
    EnumCandidateStatus,
    ICandidate,
    IConsent,
    ICriteria,
    ICriteriaCategory,
    IInsight,
    IInsightProject,
    IUser,
} from '@innbyggerpanelet/api-interfaces';

const allCriteriaCategories: ICriteriaCategory[] = [
    {
        id: 1,
        name: 'Alder',
        description: 'Kandidatens aldergruppe.',
    },
    {
        id: 2,
        name: 'Hjelpemidler',
        description: 'Utvalg av mulige hjelpemidler tatt i bruk av kandidat.',
    },
];

const allCriterias: ICriteria[] = [
    {
        id: 1,
        name: 'Mellom 18 og 25 år',
        category: allCriteriaCategories[0],
        exclusivitySlug: 'age',
    },
    {
        id: 2,
        name: 'Mellom 26 og 35 år',
        category: allCriteriaCategories[0],
        exclusivitySlug: 'age',
    },
    { id: 3, name: 'Skjermoppleser', category: allCriteriaCategories[1] },
    { id: 4, name: 'Rullestol', category: allCriteriaCategories[1] },
];

const allConsents: IConsent[] = [
    { id: 1, description: 'Samtykker til skjermopptak' },
];

const teamMember: IUser = {
    id: 3,
    name: 'Terje Navansatt',
    email: 'terje@nav.no',
    phone: '45676456',
    latestUpdate: '21.01.2022',
    criterias: [],
};

const primaryProject: IInsightProject = {
    id: 1,
    name: 'Primært prosjekt',
    description: 'Primært prosjektbeskrivelse',
    start: '01.12.2021',
    end: '01.04.2021',
    members: [teamMember],
};

const primaryInsight: IInsight = {
    id: 1,
    name: 'Primærtest',
    description: 'Primærtest beskrivelse',
    project: primaryProject,
    start: '01.01.2022',
    end: '21.01.2022',
    criterias: [allCriterias[0], allCriterias[2]],
    consents: [allConsents[0]],
};

const olaUser: IUser = {
    id: 1,
    name: 'Ola Nordmann',
    email: 'ola@nordmann.no',
    phone: '12332123',
    latestUpdate: '21.01.2022',
    criterias: [allCriterias[0], allCriterias[2]],
};

const olaCandidatures: ICandidate[] = [
    {
        user: olaUser,
        insight: primaryInsight,
        relevancyGrading: 0.8,
        status: EnumCandidateStatus.Completed,
    },
];

const kariUser: IUser = {
    id: 2,
    email: 'kari@example.com',
    phone: '32132321',
    latestUpdate: '2022-01-02',
    name: 'Kari Nordmann',
    criterias: [allCriterias[1], allCriterias[3]],
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
    allUsers,
};
