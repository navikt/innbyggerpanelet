import { ICitizen, ICriteria, IEmployee, IInsight, IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { plainToInstance } from 'class-transformer';
import { Message } from './MessageEntity';

const candidateAccepted = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket ja til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å lese kontaktinformasjon.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`
    });

    return message;
};

const candidateDeclined = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket nei til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å invitere nye kandidater.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`
    });

    return message;
};

const accountExpiration = (citizen: ICitizen) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: citizen,
        title: 'Konto i ferd med å nå utløptsdato.',
        description: `Kontoen din vil utløpe den ${citizen.expirationDate}. Vennligst oppdater samtykke på Min Side om du fortsatt ønsker å ta del i Innbyggerpanelet.`,
        ref: '/profil'
    });

    return message;
};

const insightExpiration = (employee: IEmployee, insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `${insight.name} har utløpt.`,
        description:
            'Vennligst påse at all informasjon relatert til dette innsiktsarbeidet har blitt anonymisert da kanditatenes samtykke har gått ut på dato.',
        ref: `/ansatt/prosjekt/${insight.project.id}`
    });

    return message;
};

const insightCreation = (employee: IEmployee, insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `Nytt innsiktsarbeid: ${insight.name}.`,
        description: 'Et nytt innsiktsarbeid har blitt opprettet i et prosjekt du er medlem av.',
        ref: `/ansatt/prosjekt/${insight.project.id}`
    });

    return message;
};

const projectInvitation = (employee: IEmployee, project: IInsightProject) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `Nytt prosjekt: ${project.name}.`,
        description: `Du har blitt lagt til som medlem i et prosjekt ${project.name}.`,
        ref: `/ansatt/prosjekt/${project.id}`
    });

    return message;
};

const criteriaUpdate = (citizen: ICitizen, criteria: ICriteria) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: citizen,
        title: 'Kriterie oppdatert',
        description: `Et kriterie du har benyttet deg av har blitt oppdatert, vennligst sjekk om dette kriteriet fortsatt gjelder deg. Hvis ikke, fjern det fra din profil. \n Oppdatert kriterie: ${criteria.category.name} - ${criteria.name}`,
        ref: '/innbygger/profil'
    });

    return message;
};

export const messageTemplates = {
    candidateAccepted,
    candidateDeclined,
    accountExpiration,
    insightExpiration,
    insightCreation,
    projectInvitation,
    criteriaUpdate
};
