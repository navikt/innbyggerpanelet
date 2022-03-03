/* eslint-disable indent */
import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consent implements IConsent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}
