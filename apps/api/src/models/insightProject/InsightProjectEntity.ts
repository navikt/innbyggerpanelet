/* eslint-disable indent */
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Transform } from 'class-transformer';
import { ArrayNotEmpty, IsDate, MinDate, MinLength, Validate } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsBeforeConstraint } from '../../lib/validators/IsBeforeConstraint';
import { Employee } from '../employee/EmployeeEntity';
import { Insight } from '../insight/InsightEntity';

@Entity()
export class InsightProject implements IInsightProject {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(5, { message: 'Tittel er for kort, minst 5 bokstaver.' })
    name: string;

    @Column()
    @MinLength(10, { message: 'Beskrivelse er for kort, minst 10 bokstaver.' })
    description: string;

    @Column({ type: 'date', default: new Date(), nullable: false })
    @IsDate({ message: 'Ingen startdato valgt.' })
    @Transform(({ value }) => new Date(value))
    @Validate(IsBeforeConstraint, ['end'])
    start: string;

    @Column({ type: 'date', default: new Date() })
    @IsDate({ message: 'Ingen sluttdato valgt.' })
    @Transform(({ value }) => new Date(value))
    @MinDate(new Date(), { message: 'Sluttdato kan ikke være før dagens dato.' })
    end: string;

    @ManyToOne(() => Employee, (employee) => employee.ownerships)
    owner: Employee;

    @JoinTable()
    @ManyToMany(() => Employee, (employee) => employee.insightProjects)
    @ArrayNotEmpty({ message: 'Ingen medlemmer valgt.' })
    members: Employee[];

    @OneToMany(() => Insight, (insight) => insight.project)
    insights: Insight[];
}
