/* eslint-disable indent */
import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, OneToMany } from 'typeorm';
import { Consent } from './../consent/ConsentEntity';

@Entity()
export class ConsentTemplate implements IConsentTemplate {
    [key: string]: any;

    @Column({ primary: true })
    id: number;

    @Column({ default: 1, primary: true })
    version: number;

    @Column({ default: true })
    newest: boolean;

    @OneToMany(() => Consent, (consent) => consent.insight)
    consents: Consent[];

    @Column()
    title: string;

    @Column()
    description: string;
}
