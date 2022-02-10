/* eslint-disable indent */
import { ICriteria, ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CriteriaCategory } from '../criteriaCategory/CriteriaCategoryEntity';

@Entity()
export class Criteria implements ICriteria {
    [key: string]: string | number | ICriteriaCategory;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    exclusivitySlug?: string;

    @ManyToOne(
        () => CriteriaCategory,
        (criteriaCategory) => criteriaCategory.criterias
    )
    category: CriteriaCategory;
}
