import { plainToInstance } from 'class-transformer'
import { add } from 'date-fns'
import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { Citizen } from '../models/citizen/CitizenEntity'
import { CitizenService } from '../services/CitizenService'
import { authenticated, navAuthenticated } from './middleware/authentication'

const citizenRoutes = Router()

citizenRoutes.get('/currentUser', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const citizenService = new CitizenService(database)
        const result: Citizen = await citizenService.getById(id)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.get('/prioritized', navAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const criterias = (req.query.criterias as unknown as string[]) || []
        const insightEndDate = req.query.insightEndDate as unknown as string

        const citizenService = new CitizenService(database)
        const result: Citizen[] | undefined = await citizenService.getPrioritizedCitizens(criterias, insightEndDate)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.get('/full', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const citizenService = new CitizenService(database)
        const result: Citizen = await citizenService.getFullCitizenById(id)
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.post('/', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const citizenService = new CitizenService(database)
        req.body.registered = true
        const updatedCitizen = plainToInstance(Citizen, req.body)
        const result = await citizenService.update(updatedCitizen.id, updatedCitizen)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.put('/', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const citizenService = new CitizenService(database)
        const updatedCitizen = plainToInstance(Citizen, req.body)
        const result = await citizenService.update(updatedCitizen.id, updatedCitizen)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.put('/extend', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const citizenService = new CitizenService(database)
        const updatedCitizen = plainToInstance(Citizen, {
            ...req.body,
            expirationDate: add(new Date(), { years: 1 }).toISOString().slice(0, 10),
        })
        const result = await citizenService.update(id, updatedCitizen)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.delete('/', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const citizenService = new CitizenService(database)
        await citizenService.delete(id)

        res.json({ message: 'User deleted' })
    } catch (error) {
        next(error)
    }
})

export default citizenRoutes
