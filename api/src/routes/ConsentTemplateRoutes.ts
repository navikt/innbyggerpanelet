import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { ConsentTemplate } from './../models/consentTemplate/ConsentTemplateEntity'
import { ConsentTemplateService, IConsentTemplateSearch } from './../services/ConsentTemplateService'
import { navAuthenticated, adminAuthenticated } from './middleware/authentication'

const consentTemplateRoutes = Router()

consentTemplateRoutes.get('/', navAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const queries = req.query as unknown as IConsentTemplateSearch

        const consentTemplateService = new ConsentTemplateService(database)
        const result: ConsentTemplate[] = await consentTemplateService.search(queries)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

consentTemplateRoutes.get('/:id', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consentTemplateId = parseInt(req.params.id)

        const consentTemplateService = new ConsentTemplateService(database)
        const result: ConsentTemplate | undefined = await consentTemplateService.getById(consentTemplateId)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

consentTemplateRoutes.post('/', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consentTemplateService = new ConsentTemplateService(database)
        const newConsentTemplate: ConsentTemplate = plainToInstance(ConsentTemplate, req.body)
        const result: ConsentTemplate = await consentTemplateService.create(newConsentTemplate)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

consentTemplateRoutes.put('/', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consentTemplateService = new ConsentTemplateService(database)
        const updatedConsentTemplate: ConsentTemplate = plainToInstance(ConsentTemplate, req.body)
        const result: ConsentTemplate = await consentTemplateService.update(
            updatedConsentTemplate.id,
            updatedConsentTemplate,
        )

        res.json(result)
    } catch (error) {
        next(error)
    }
})

consentTemplateRoutes.put('/disable', adminAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const consentTemplateService = new ConsentTemplateService(database)
        const disabledConsentTemplate: ConsentTemplate = plainToInstance(ConsentTemplate, req.body)
        const result: ConsentTemplate = await consentTemplateService.disable(disabledConsentTemplate)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default consentTemplateRoutes
