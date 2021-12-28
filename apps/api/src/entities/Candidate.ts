import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { Trait } from './';

@Entity()
export class Candidate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Trait)
    @JoinTable()
    traits: Trait[];
}
