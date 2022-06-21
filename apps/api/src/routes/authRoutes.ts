import { EnumUserRole } from '@innbyggerpanelet/api-interfaces';
import { Router } from 'express';
import { database } from '../loaders';
import { CitizenService } from '../services/CitizenService';
import { EmployeeService } from '../services/EmployeeService';
import { authenticated } from './middleware/authenticationHandler';

const authRoutes = Router();

authRoutes.get('/currentUser', authenticated, async (req, res, next) => {
    try {
        const { id, role } = req.user;

        if (role === EnumUserRole.Citizen) {
            const citizenService = new CitizenService(database);
            const result = await citizenService.getById(id);
            res.json(result);
        } else {
            const employeeService = new EmployeeService(database);
            const result = await employeeService.getById(id);
            res.json(result);
        }
    } catch (error) {
        next(error);
    }
});

authRoutes.get('/logout', authenticated, (req, res, next) => {
    try {
        const { role } = req.user;

        if (role === EnumUserRole.Citizen) {
            res.redirect('/api/idporten/logout');
        } else {
            res.redirect('/api/azure/logout');
        }
    } catch (error) {
        next(error);
    }
});

export default authRoutes;
