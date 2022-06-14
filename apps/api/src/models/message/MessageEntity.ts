/* eslint-disable indent */
import { IMessage } from '@innbyggerpanelet/api-interfaces';
import { Transform } from 'class-transformer';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/UserEntity';

@Entity()
export class Message implements IMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz', default: new Date() })
    @Transform(({ value }) => new Date(value))
    timestamp: string;

    @ManyToOne(() => User, (user) => user.messages)
    @JoinColumn()
    recipient: User;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    read: boolean;

    @Column({ nullable: true })
    ref?: string;
}
