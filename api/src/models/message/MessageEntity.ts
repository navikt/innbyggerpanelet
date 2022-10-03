/* eslint-disable indent */
import { Transform } from 'class-transformer'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { IMessage } from '../../types'
import { Citizen } from '../citizen/CitizenEntity'
import { Employee } from '../employee/EmployeeEntity'
import { User } from '../user/UserEntity'

@Entity()
export class Message implements IMessage {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ type: 'timestamptz', default: new Date() })
    @Transform(({ value }) => new Date(value))
    timestamp!: string

    @ManyToOne(() => User, (user) => user.messages, { onDelete: 'CASCADE' })
    @JoinColumn()
    recipient!: Citizen | Employee

    @Column()
    title!: string

    @Column()
    description!: string

    @Column({ default: false })
    read!: boolean

    @Column({ nullable: true })
    ref?: string
}
