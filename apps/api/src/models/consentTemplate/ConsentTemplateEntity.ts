/* eslint-disable indent */
import { IConsentTemplate } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Consent } from './../consent/ConsentEntity';

@Entity()
export class ConsentTemplate implements IConsentTemplate {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Consent, (consent) => consent.insight)
    consents: Consent[];

    @Column({ default: 1 })
    version: number;

    @Column()
    title: string;

    @Column()
    description: string;
}
