/* eslint-disable indent */
import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Citizen } from '../citizen/CitizenEntity';
import { Insight } from '../insight/InsightEntity';

@Entity()
export class Candidate implements ICandidate {
    @ManyToOne(() => Citizen, (citizen) => citizen.id, {
        primary: true,
        nullable: false
    })
    @JoinColumn()
    citizen: Citizen;

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
