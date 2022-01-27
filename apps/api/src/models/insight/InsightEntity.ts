/* eslint-disable indent */
import { IInsight } from '@innbyggerpanelet/api-interfaces';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Candidate } from '../candidate/CandidateEntity';
import { Consent } from '../consent/ConsentEntity';
import { Criteria } from '../criteria/CriteriaEntity';
import { InsightProject } from '../insightProject/InsightProjectEntity';

@Entity()
export class Insight implements IInsight {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => InsightProject, (project) => project.insights)
    project: InsightProject;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    start: string;

    @Column()
    end: string;

    @OneToMany(() => Candidate, (candidate) => candidate.insight)
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];

    @ManyToMany(() => Consent)
    @JoinTable()
    consents: Consent[];
}
