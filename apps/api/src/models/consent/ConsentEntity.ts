import { IConsent } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consent implements IConsent {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;
}
