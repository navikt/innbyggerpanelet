/* eslint-disable indent */
import { EnumEmployeeRole, IEmployee } from '@innbyggerpanelet/api-interfaces';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ChildEntity, Column, ManyToMany } from 'typeorm';
import { InsightProject } from '../insightProject/InsightProjectEntity';
import { User } from '../user/UserEntity';

@ChildEntity()
export class Employee extends User implements IEmployee {
    @Column({
        unique: true
    })
    @IsEmail({}, { message: 'Epost må være på riktig format (ola@eksempel.no).' })
    @IsNotEmpty({ message: 'E-Post må være fylt ut.' })
    email: string;

    @Column({
        type: 'enum',
        enum: EnumEmployeeRole,
        default: EnumEmployeeRole.InsightWorker
    })
    role: EnumEmployeeRole;

    @ManyToMany(() => InsightProject, (insightProject) => insightProject.members)
    insightProjects: InsightProject[];
}
