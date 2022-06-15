/* eslint-disable indent */
import { EnumUserRole, IUser } from '@innbyggerpanelet/api-interfaces';
import { Transform } from 'class-transformer';
import { IsDate, IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { Candidate } from '../candidate/CandidateEntity';
import { Criteria } from '../criteria/CriteriaEntity';
import { InsightProject } from '../insightProject/InsightProjectEntity';
import { Message } from '../message/MessageEntity';

@Entity()
export class User implements IUser {
    [key: string]: any;

    // OID from OIDC token_id
    @PrimaryColumn()
    id: string;

    @Column()
    @IsNotEmpty({ message: 'Navn kan ikke være tomt.' })
    name: string;

    @Column({ type: 'date', default: new Date() })
    @IsDate({ message: 'Ingen startdato valgt.' })
    @Transform(({ value }) => new Date(value))
    latestUpdate: string;

    @Column({
        unique: true
    })
    @IsEmail({}, { message: 'Epost må være på riktig format (ola@eksempel.no).' })
    @IsNotEmpty({ message: 'E-Post må være fylt ut.' })
    email: string;

    @Column({ default: '12345678' })
    @IsPhoneNumber('NO', { message: 'Påse at du har skrevet et gyldig norsk telefonnummber.' })
    phone: string;

    @Column({ type: 'enum', enum: EnumUserRole, default: EnumUserRole.Citizen })
    @IsNotEmpty()
    role: EnumUserRole;

    @Column({ unique: true, nullable: true })
    birthNumber?: string;

    @OneToMany(() => Candidate, (candidate) => candidate.user)
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];

    @ManyToMany(() => InsightProject, (insightProject) => insightProject.members)
    insightProjects: InsightProject[];

    @OneToMany(() => Message, (message) => message.recipient)
    messages: Message[];
}
