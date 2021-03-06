/* eslint-disable indent */
import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { MinLength } from 'class-validator';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CriteriaCategory } from '../criteriaCategory/CriteriaCategoryEntity';

@Entity()
export class Criteria implements ICriteria {
    [key: string]: string | number | ICriteriaCategory;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(5, { message: 'Navn er for kort, minst 5 bokstaver.' })
    name: string;

    @Column({ nullable: true })
    exclusivitySlug?: string;

    @ManyToOne(() => CriteriaCategory, (criteriaCategory) => criteriaCategory.criterias)
    category: CriteriaCategory;
}
