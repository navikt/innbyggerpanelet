import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    JoinTable,
    ManyToMany,
} from 'typeorm';
import { Criteria } from '../criteria/CriteriaEntity';
import { ICandidate } from '@innbyggerpanelet/api-interfaces';

@Entity()
export class Candidate implements ICandidate {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;

    @ManyToMany(() => Criteria)
    @JoinTable()
        traits: Criteria[];
}