import { validate } from 'class-validator';
import { Connection, FindOperator, ILike, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Employee } from '../models/employee/EmployeeEntity';
import BaseService from './BaseService';

export interface IEmployeeSearch {
    where: {
        firstname?: string | string[] | FindOperator<string | string[]>;
        surname?: string | string[] | FindOperator<string | string[]>;
        role: string;
    };
    relations: string | string[];
}

export class EmployeeService extends BaseService<Employee> {
    private _database: Connection;
    private _employeeRepository: Repository<Employee>;

    constructor(db: Connection) {
        super(db, Employee);
        this._database = db;
        this._employeeRepository = this._database.getRepository(Employee);
    }

    get(): Promise<Employee[]> {
        throw new Error('Method not implemented.');
    }

    async getById(id: string | number): Promise<Employee> {
        const employee = await this._employeeRepository.findOne(id);
        if (!employee) throw new NotFoundError({ message: ServerErrorMessage.notFound('Employee') });
        return employee;
    }

    async create(dto: Employee): Promise<Employee> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._employeeRepository.save(dto);
    }

    async update(id: string | number, dto: Employee): Promise<Employee> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });
        return await this._employeeRepository.save(dto);
    }

    delete(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async search(queries: IEmployeeSearch): Promise<Employee[] | undefined> {
        // TODO: Make general solution for all special fields
        // Case insensitive string search
        if (queries.where && queries.where.firstname) queries.where.firstname = ILike(queries.where.firstname);
        if (queries.where && queries.where.surname) queries.where.surname = ILike(queries.where.surname);

        const employees = await this._employeeRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (employees.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Employees') });

        return employees;
    }

    async getEmployeesByName(name: string): Promise<Employee[] | undefined> {
        const employees = await this._employeeRepository.find({
            where: [{ firstname: ILike(`%${name}%`) }, { surname: ILike(`%${name}%`) }]
        });

        if (employees.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Employee') });

        return employees;
    }
}
