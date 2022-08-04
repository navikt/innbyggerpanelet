/* eslint-disable indent */
import { EnumCandidateStatus, ICandidate } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Citizen } from '../citizen/CitizenEntity';
import { Insight } from '../insight/InsightEntity';

@Entity()
export class Candidate implements ICandidate {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Citizen, (citizen) => citizen.id, {
        nullable: true,
        onDelete: 'SET NULL'
    })
    @JoinColumn()
    citizen?: Citizen;

    @ManyToOne(() => Insight, (insight) => insight.id, {
        nullable: false,
        onDelete: 'CASCADE'
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
