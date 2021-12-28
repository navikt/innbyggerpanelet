import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Consent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
