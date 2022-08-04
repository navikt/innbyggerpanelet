/* eslint-disable indent */
import { ICitizen } from '@innbyggerpanelet/api-interfaces';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ChildEntity, Column, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Candidate } from '../candidate/CandidateEntity';
import { Criteria } from '../criteria/CriteriaEntity';
import { User } from '../user/UserEntity';

@ChildEntity()
export class Citizen extends User implements ICitizen {
    @Column()
    @IsNotEmpty({ message: 'Personummer kan ikke være tomt.' })
    pnr: string;

    @Column({})
    @IsPhoneNumber('NO', { message: 'Påse at du har skrevet et gyldig norsk telefonnummber.' })
    phone: string;

    @Column({ type: 'date', nullable: true })
    @IsDate({ message: 'Ingen utløpsdato valgt.' })
    @Transform(({ value }) => new Date(value))
    expirationDate?: string;

    @OneToMany(() => Candidate, (candidate) => candidate.citizen, { nullable: true, cascade: true })
    candidates: Candidate[];

    @ManyToMany(() => Criteria)
    @JoinTable()
    criterias: Criteria[];
}
