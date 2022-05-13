/* eslint-disable indent */
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Insight } from '../insight/InsightEntity';
import { User } from '../user/UserEntity';

@Entity()
export class InsightProject implements IInsightProject {
    [key: string]: any;

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({ type: 'date', default: new Date().toISOString().slice(0, 10) })
    start: string;

    @Column({ type: 'date', default: new Date().toISOString().slice(0, 10) })
    end: string;

    @JoinTable()
    @ManyToMany(() => User, (user) => user.insightProjects)
    members: User[];

    @OneToMany(() => Insight, (insight) => insight.project)
    insights: Insight[];
}
