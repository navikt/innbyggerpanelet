/* eslint-disable indent */
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable } from 'typeorm';
import { Criteria } from '../criteria/CriteriaEntity';
import { IUser } from '@innbyggerpanelet/api-interfaces';
import { Candidate } from '../candidate/CandidateEntity';
import { InsightProject } from '../insightProject/InsightProjectEntity';

@Entity()
export class User implements IUser {
    [key: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    latestUpdate: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    phone: string;

    @OneToMany(() => Candidate, (candidate) => candidate.user)
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];

    @ManyToMany(() => InsightProject, (insightProject) => insightProject.members)
    insightProjects: InsightProject[];
}
