/* eslint-disable indent */
import { MinLength } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ICriteriaCategory } from '../../types'
import { Criteria } from '../criteria/CriteriaEntity'

@Entity()
export class CriteriaCategory implements ICriteriaCategory {
    [key: string]: any

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @MinLength(5, { message: 'Navn er for kort, minst 5 bokstaver.' })
    name!: string

    @Column()
    @MinLength(10, { message: 'Beskrivelse er for kort, minst 10 bokstaver.' })
    description!: string

    @OneToMany(() => Criteria, (criteria) => criteria.category)
    criterias!: Criteria[]
}
