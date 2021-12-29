import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { Trait } from '.';
import { ICandidate } from '@innbyggerpanelet/api-interfaces';

@Entity()
export class Candidate implements ICandidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Trait)
    @JoinTable()
    traits: Trait[];
}
