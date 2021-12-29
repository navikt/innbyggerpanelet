import { ITrait } from '@innbyggerpanelet/api-interfaces';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trait implements ITrait {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
