import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { Employee } from '../models/employee/EmployeeEntity'
import { EmployeeService, IEmployeeSearch } from '../services/EmployeeService'
import { adminAuthenticated, navAuthenticated } from './middleware/authentication'

const employeeRoutes = Router()

employeeRoutes.get('/', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queries = req.query as unknown as IEmployeeSearch

        const employeeService = new EmployeeService(database)
        const result: Employee[] | undefined = await employeeService.search(queries)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

employeeRoutes.get('/teamMember', navAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const name = req.query.name || ''

        const employeeService = new EmployeeService(database)
        const result: Employee[] | undefined = await employeeService.getEmployeesByName(name.toString())

        res.json(result)
    } catch (error) {
        next(error)
    }
})

employeeRoutes.put('/', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const employeeService = new EmployeeService(database)
        const newEmployee = plainToInstance(Employee, req.body)

        const result = await employeeService.create(newEmployee)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default employeeRoutes
