/* eslint-disable indent */
import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm';
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

    @Column()
    start: string;

    @Column()
    end: string;

    @ManyToMany(() => User)
    @JoinTable()
    members: User[];

    @OneToMany(() => Insight, (insight) => insight.project)
    insights: Insight[];
}
