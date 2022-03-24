/* eslint-disable indent */
import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Insight } from '../insight/InsightEntity';
import { User } from '../user/UserEntity';

@Entity()
export class Candidate implements ICandidate {
    @ManyToOne(() => User, (user) => user.id, {
        primary: true,
        nullable: false
    })
    @JoinColumn()
    user: User;

    @ManyToOne(() => Insight, (insight) => insight.id, {
        primary: true,
        nullable: false
    })
    @JoinColumn()
    insight: Insight;

    @Column({ default: false })
    hasConsented: boolean;

    @Column({ type: 'float' })
    relevancyGrading: number;

    @Column({
        type: 'enum',
        enum: EnumCandidateStatus,
        default: EnumCandidateStatus.Pending
    })
    status: EnumCandidateStatus;
}
