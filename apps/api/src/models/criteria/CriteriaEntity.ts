import { ICriteria } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Criteria implements ICriteria {
    @PrimaryGeneratedColumn()
        id: number;

    @Column()
        name: string;
}
