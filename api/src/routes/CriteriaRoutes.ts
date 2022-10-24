import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { Criteria } from '../models/criteria/CriteriaEntity'
import { CriteriaService, ICriteriaSearch } from '../services'
import { authenticated } from './middleware/authentication'

const criteriaRouter = Router()

criteriaRouter.get('/', async (req, res, next) => {
    try {
        // Hacky, consider assigning string | string[] to queries through request and
        // split into object with where and sort fields.
        // TODO: Find better solution for casting queries.
        const queries = req.query as unknown as ICriteriaSearch

        const criteriaService = new CriteriaService(database)
        const result: Criteria[] | undefined = await criteriaService.search(queries)
        res.json(result)
    } catch (error) {
        next(error)
    }
})

criteriaRouter.post('/', async (req, res, next) => {
    try {
        const criteriaService = new CriteriaService(database)
        const newCriteriaCategory = plainToInstance(Criteria, req.body)

        const result = await criteriaService.create(newCriteriaCategory)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

criteriaRouter.put('/', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const criteriaService = new CriteriaService(database)
        const updatedCriteria = plainToInstance(Criteria, req.body)

        const result = await criteriaService.update(updatedCriteria.id, updatedCriteria)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default criteriaRouter
