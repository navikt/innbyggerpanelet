/* eslint-disable indent */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToMany,
    JoinTable,
} from 'typeorm';
import { Criteria } from '../criteria/CriteriaEntity';
import { ICriteria, IUser } from '@innbyggerpanelet/api-interfaces';
import { Candidate } from '../candidate/CandidateEntity';
import { InsightProject } from '../insightProject/InsightProjectEntity';

@Entity()
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    latestUpdate: string;

    @Column()
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Candidate, (candidate) => candidate.user)
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: ICriteria[];

    @ManyToMany(
        () => InsightProject,
        (insightProject) => insightProject.members
    )
    insightProjects: InsightProject[];
}
