/* eslint-disable indent */
import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Candidate } from '../candidate/CandidateEntity';
import { Criteria } from '../criteria/CriteriaEntity';
import { InsightProject } from '../insightProject/InsightProjectEntity';

@Entity()
export class User implements IUser {
    [key: string]: any;

    // OID from OIDC token_id
    @PrimaryColumn()
    id: string;

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

    @Column({ type: 'enum', enum: EnumUserRole, default: EnumUserRole.Citizen })
    role: EnumUserRole;

    @OneToMany(() => Candidate, (candidate) => candidate.user)
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];

    @ManyToMany(() => InsightProject, (insightProject) => insightProject.members)
    insightProjects: InsightProject[];
}
