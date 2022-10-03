import { plainToInstance } from 'class-transformer'
import { add } from 'date-fns'
import { Router } from 'express'
import { database } from '../loaders'
import { Citizen } from '../models/citizen/CitizenEntity'
import { CitizenService } from '../services/CitizenService'

const citizenRoutes = Router()

citizenRoutes.get('/currentUser', async (req, res, next) => {
    try {
        //const { id } = req.user

        const citizenService = new CitizenService(database)
        const result: Citizen = await citizenService.getById(String(0))

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.get('/prioritized', async (req, res, next) => {
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

citizenRoutes.get('/full', async (req, res, next) => {
    try {
        // const { id } = req.user

        const citizenService = new CitizenService(database)
        const result: Citizen = await citizenService.getFullCitizenById(String(0))
        return res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.post('/', async (req, res, next) => {
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

citizenRoutes.put('/', async (req, res, next) => {
    try {
        const citizenService = new CitizenService(database)
        const updatedCitizen = plainToInstance(Citizen, req.body)
        const result = await citizenService.update(updatedCitizen.id, updatedCitizen)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.put('/extend', async (req, res, next) => {
    try {
        //const { id } = req.user

        const citizenService = new CitizenService(database)
        const updatedCitizen = plainToInstance(Citizen, {
            ...req.body,
            expirationDate: add(new Date(), { years: 1 }).toISOString().slice(0, 10),
        })
        const result = await citizenService.update(String(0), updatedCitizen)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

citizenRoutes.delete('/', async (req, res, next) => {
    try {
        //const { id } = req.user

        const citizenService = new CitizenService(database)
        await citizenService.delete(String(0))

        res.json({ message: 'User deleted' })
    } catch (error) {
        next(error)
    }
})

export default citizenRoutes
