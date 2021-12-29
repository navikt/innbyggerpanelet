import { IInsight } from '@innbyggerpanelet/api-interfaces';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Candidate, Consent, Trait } from '.';

@Entity()
export class Insight implements IInsight {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    starts: string;

    @Column()
    ends: string;

    @ManyToMany(() => Candidate)
    @JoinTable()
    candidates: Candidate[];

    @ManyToMany(() => Trait)
    @JoinTable()
    traits: Trait[];

    @ManyToMany(() => Consent)
    @JoinTable()
    consents: Consent[];
}
