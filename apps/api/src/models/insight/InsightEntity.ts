import { IInsight } from '@innbyggerpanelet/api-interfaces';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Candidate } from '../candidate/CandidateEntity';
import { Consent } from '../consent/ConsentEntity';
import { Criteria } from '../criteria/CriteriaEntity';

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

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];

    @ManyToMany(() => Consent)
    @JoinTable()
    consents: Consent[];
}
