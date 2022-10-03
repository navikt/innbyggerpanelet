/* eslint-disable indent */
import { IsNotEmpty } from 'class-validator'
import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from 'typeorm'
import { EnumUserRole, IUser } from '../../types'
import { Message } from '../message/MessageEntity'

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User implements IUser {
    [key: string]: any

    @PrimaryColumn()
    id!: string

    @Column()
    @IsNotEmpty({ message: 'Fornavn kan ikke være tomt.' })
    firstname!: string

    @Column()
    @IsNotEmpty({ message: 'Etternavn kan ikke være tomt.' })
    surname!: string

    @Column({ default: false })
    registered!: boolean

    @Column({
        type: 'enum',
        enum: EnumUserRole,
    })
    role!: EnumUserRole

    @OneToMany(() => Message, (message) => message.recipient)
    messages!: Message[]
}
