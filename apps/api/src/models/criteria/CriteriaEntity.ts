/* eslint-disable indent */
import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CriteriaCategory } from '../criteriaCategory/CriteriaCategoryEntity';

@Entity()
export class Criteria implements ICriteria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(
        () => CriteriaCategory,
        (criteriaCategory) => criteriaCategory.criterias
    )
    category: CriteriaCategory;
}
