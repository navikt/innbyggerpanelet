import { plainToInstance } from 'class-transformer'
import { Router } from 'express'
import { database } from '../loaders'
import { Insight } from '../models/insight/InsightEntity'
import { IInsightSearch } from '../services'
import { InsightService } from './../services/InsightService'

const insightRouter = Router()

insightRouter.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IInsightSearch

        const insightService = new InsightService(database)

        const result: Insight[] | undefined = await insightService.search(queries)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

insightRouter.get('/project/:id', async (req, res, next) => {
    try {
        const projectId = parseInt(req.params.id)

        const insightService = new InsightService(database)
        const result: Insight[] = await insightService.getByProjectId(projectId)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

insightRouter.post('/', async (req, res, next) => {
    try {
        const insightService = new InsightService(database)
        const newInsight = plainToInstance(Insight, req.body)

        const result = await insightService.create(newInsight)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default insightRouter
