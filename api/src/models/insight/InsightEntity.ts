/* eslint-disable indent */
import { Transform } from 'class-transformer'
import { ArrayNotEmpty, IsDate, MinDate, MinLength, Validate } from 'class-validator'
import { sub } from 'date-fns'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { IsBeforeConstraint } from '../../lib/validators/IsBeforeConstraint'
import { IInsight } from '../../types'
import { Candidate } from '../candidate/CandidateEntity'
import { Consent } from '../consent/ConsentEntity'
import { Criteria } from '../criteria/CriteriaEntity'
import { InsightProject } from '../insightProject/InsightProjectEntity'

@Entity()
export class Insight implements IInsight {
    [key: string]: any

    @PrimaryGeneratedColumn()
    id!: number

    @ManyToOne(() => InsightProject, (project) => project.insights)
    project!: InsightProject

    @Column()
    @MinLength(5, { message: 'Tittel er for kort, minst 5 bokstaver.' })
    name!: string

    @Column()
    @MinLength(10, { message: 'Beskrivelse er for kort, minst 10 bokstaver.' })
    description!: string

    @Column({ type: 'date', default: new Date() })
    @IsDate({ message: 'Ingen startdato valgt.' })
    @Transform(({ value }) => new Date(value))
    @Validate(IsBeforeConstraint, ['end'])
    start!: string

    @Column({ type: 'date', default: new Date() })
    @IsDate({ message: 'Ingen sluttdato valgt.' })
    @Transform(({ value }) => new Date(value))
    @MinDate(sub(new Date(), { days: 1 }), { message: 'Sluttdato kan ikke være før dagens dato.' })
    end!: string

    @OneToMany(() => Candidate, (candidate) => candidate.insight)
    candidates!: Candidate[]

    @ManyToMany(() => Criteria)
    @JoinTable()
    @ArrayNotEmpty({ message: 'Ingen kriterier valgt.' })
    criterias!: Criteria[]

    @OneToMany(() => Consent, (consent) => consent.insight)
    @ArrayNotEmpty({ message: 'Ingen samtykker valgt.' })
    consents!: Consent[]
}
