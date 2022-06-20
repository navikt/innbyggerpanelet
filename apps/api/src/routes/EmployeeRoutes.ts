import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { Employee } from '../models/employee/EmployeeEntity';
import { EmployeeService, IEmployeeSearch } from '../services/EmployeeService';
import { adminAuthenticated, navAuthenticated } from './middleware/authenticationHandler';

const employeeRoutes = Router();

employeeRoutes.get('/', adminAuthenticated, async (req, res, next) => {
    try {
        const queries = req.query as unknown as IEmployeeSearch;

        const employeeService = new EmployeeService(database);
        const result: Employee[] = await employeeService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

employeeRoutes.get('/teamMember', navAuthenticated, async (req, res, next) => {
    try {
        const name = req.query.name || '';

        const employeeService = new EmployeeService(database);
        const result: Employee[] = await employeeService.getEmployeesByName(name);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

employeeRoutes.put('/', navAuthenticated, async (req, res, next) => {
    try {
        const employeeService = new EmployeeService(database);
        const newEmployee = plainToInstance(Employee, req.body);

        const result = await employeeService.create(newEmployee);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default employeeRoutes;
