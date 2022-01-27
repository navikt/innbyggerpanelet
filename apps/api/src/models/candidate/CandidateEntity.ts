/* eslint-disable indent */
import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import {
    EnumCandidateStatus,
    ICandidate,
} from '@innbyggerpanelet/api-interfaces';
import { User } from '../user/UserEntity';
import { Insight } from '../insight/InsightEntity';

@Entity()
export class Candidate implements ICandidate {
    @ManyToOne(() => User, (user) => user.id, {
        primary: true,
        nullable: false,
    })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Insight, (insight) => insight.id, {
        primary: true,
        nullable: false,
    })
    @JoinColumn()
    insight: Insight;

    @Column()
    relevancyGrading: number;

    @Column({
        type: 'enum',
        enum: EnumCandidateStatus,
        default: EnumCandidateStatus.Pending,
    })
    status: EnumCandidateStatus;
}