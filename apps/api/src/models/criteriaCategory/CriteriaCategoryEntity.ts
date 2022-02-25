/* eslint-disable indent */
import { ICriteriaCategory } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Criteria } from '../criteria/CriteriaEntity';

@Entity()
export class CriteriaCategory implements ICriteriaCategory {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Criteria, (criteria) => criteria.category)
    criterias: Criteria[];
}
