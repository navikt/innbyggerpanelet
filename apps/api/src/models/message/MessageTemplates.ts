import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { plainToInstance } from 'class-transformer';
import { Message } from './MessageEntity';

const candidateAccepted = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        recipient: insight.project.members[0],
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket ja til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å lese kontaktinformasjon.`,
        ref: `/prosjekt/${insight.project.id}`
    });

    return message;
};

const candidateDeclined = (insight: IInsight) => {
    const message = plainToInstance(Message, {
        recipient: insight.project.members[0],
        title: `Oppdatering vedrørende kandidat i ${insight.name}`,
        description: `En innbygger har takket nei til å delta i innsiktsarbeidet: ${insight.name}. Gå videre for å invitere nye kandidater.`,
        ref: `/prosjekt/${insight.project.id}`
    });

    return message;
};

export const messageTemplates = { candidateAccepted, candidateDeclined };
