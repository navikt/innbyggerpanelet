import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { CitizenService } from '../services/CitizenService'
import { EmployeeService } from '../services/EmployeeService'
import { EnumUserRole } from '../types'
import { authenticated } from './middleware/authentication'

const authRoutes = Router()

authRoutes.get('/currentUser', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, role } = req.user

        if (role === EnumUserRole.Citizen) {
            const citizenService = new CitizenService(database)
            const result = await citizenService.getById(id)
            res.json(result)
        } else {
            const employeeService = new EmployeeService(database)
            const result = await employeeService.getById(id)
            res.json(result)
        }
    } catch (error) {
        next(error)
    }
})

export default authRoutes
