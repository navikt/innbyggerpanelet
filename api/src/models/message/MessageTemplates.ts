import { plainToInstance } from 'class-transformer'
import { ICitizen, ICriteria, IEmployee, IInsight, IInsightProject } from '../../types'
import { Message } from './MessageEntity'

const candidateAccepted = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket ja til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å lese kontaktinformasjon.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`,
    })

    return message
}

const candidateDeclined = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket nei til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å invitere nye kandidater.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`,
    })

    return message
}

const accountExpiration = (citizen: ICitizen) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: citizen,
        title: 'Konto i ferd med å nå utløptsdato.',
        description: `Kontoen din vil utløpe den ${citizen.expirationDate}. Vennligst oppdater samtykke på Min Side om du fortsatt ønsker å ta del i Innbyggerpanelet.`,
        ref: '/profil',
    })

    return message
}

const citizenAccountDeleted = (employee: IEmployee, insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: 'Innbygger er ikke lenger medlem av Innbyggerpanelet.',
        description: `En innbygger som har tatt del i innsiktsarbeidet ${insight.name} er ikke lenger medlem av Innbyggerpanelet. Dette betyr at vedkommende sine samtykker også er trukket tilbake. Vennligst påse at all informasjon relatert til denne innbyggeren er anonymisert.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`,
    })

    return message
}

const insightExpiration = (employee: IEmployee, insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `${insight.name} har utløpt.`,
        description:
            'Vennligst påse at all informasjon relatert til dette innsiktsarbeidet har blitt anonymisert da kanditatenes samtykker har gått ut på dato.',
        ref: `/ansatt/prosjekt/${insight.project.id}`,
    })

    return message
}

const insightProjectCreation = (project: IInsightProject, employee: IEmployee) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `Prosjekt opprettet: ${project.name}`,
        description: 'Et nytt prosjekt som du er medlem av har blitt opprettet.',
        ref: `/ansatt/prosjekt/${project.id}`,
    })

    return message
}

const insightCreation = (insight: IInsight, employee: IEmployee) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: employee,
        title: `Innsiktsarbeid opprettet: ${insight.name}`,
        description: `Et nytt innsiktsarbeid er opprettet under prosjektet ${insight.project.name}.`,
        ref: `/ansatt/prosjekt/${insight.project.id}`,
    })

    return message
}

const criteriaUpdate = (citizen: ICitizen, criteria: ICriteria) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: citizen,
        title: 'Kriterie oppdatert',
        description: `Et kriterie du har benyttet deg av har blitt oppdatert, vennligst sjekk om dette kriteriet fortsatt gjelder deg. Hvis ikke, fjern det fra din profil. \n Oppdatert kriterie: ${criteria.category.name} - ${criteria.name}`,
        ref: '/innbygger/profil',
    })

    return message
}

export const messageTemplates = {
    accountExpiration,
    candidateAccepted,
    candidateDeclined,
    citizenAccountDeleted,
    insightExpiration,
    insightCreation,
    insightProjectCreation,
    criteriaUpdate,
}
