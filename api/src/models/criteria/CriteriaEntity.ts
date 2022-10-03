/* eslint-disable indent */
import { MinLength } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ICriteria, ICriteriaCategory } from '../../types'
import { CriteriaCategory } from '../criteriaCategory/CriteriaCategoryEntity'

@Entity()
export class Criteria implements ICriteria {
    [key: string]: string | number | ICriteriaCategory | boolean | undefined

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @MinLength(2, { message: 'Navn er for kort, minst 2 bokstaver.' })
    name!: string

    @Column({ default: false })
    disabled!: boolean

    @Column({ nullable: true })
    exclusivitySlug?: string

    @ManyToOne(() => CriteriaCategory, (criteriaCategory) => criteriaCategory.criterias)
    category!: CriteriaCategory
}
