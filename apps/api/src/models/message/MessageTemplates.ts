import { IInsight, IUser } from '@innbyggerpanelet/api-interfaces';
import { plainToInstance } from 'class-transformer';
import { Message } from './MessageEntity';

const candidateAccepted = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket ja til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å lese kontaktinformasjon.`,
        ref: `/prosjekt/${insight.project.id}`
    });

    return message;
};

const candidateDeclined = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: insight.project.members[0], // Needs better solution
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket nei til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å invitere nye kandidater.`,
        ref: `/prosjekt/${insight.project.id}`
    });

    return message;
};

const accountExpiration = (user: IUser) => {
    const message = plainToInstance(Message, {
        timestamp: new Date(),
        recipient: user,
        title: 'Konto i ferd med å nå utløptsdato.',
        description: `Kontoen din vil utløpe den ${user.latestUpdate}. Vennligst oppdater samtykke på Min Side om du fortsatt ønsker å ta del i Innbyggerpanelet.`,
        ref: '/profil'
    });

    return message;
};

export const messageTemplates = { candidateAccepted, candidateDeclined, accountExpiration };
