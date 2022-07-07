import { Employee } from '../../../models/employee/EmployeeEntity';
import { Connection } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';

export const createDummyEmployee = async (connection: Connection): Promise<Employee> => {
    const repository = connection.getRepository(Employee);

    return await repository.save(repository.create(plainToInstance(Employee, {
        id: uuidv4(),
        firstname: 'Dan',
        surname: 'Børge',
        registered: true,
        role: EnumUserRole.InsightWorker,
        messages: [],
        email: 'dan.børge@nav.no',
        insightProjects: []
    })));
};