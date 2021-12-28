import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trait {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
