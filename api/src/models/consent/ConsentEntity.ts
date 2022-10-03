/* eslint-disable indent */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { IConsent } from '../../types'
import { ConsentTemplate } from './../consentTemplate/ConsentTemplateEntity'
import { Insight } from './../insight/InsightEntity'

@Entity()
export class Consent implements IConsent {
    @ManyToOne(() => ConsentTemplate, (template) => template.consents, {
        primary: true,
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn()
    template!: ConsentTemplate

    @ManyToOne(() => Insight, (insight) => insight.consents, { primary: true, nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    insight!: Insight

    @Column({ nullable: true })
    justification?: string

    @Column({ default: true })
    required!: boolean
}
