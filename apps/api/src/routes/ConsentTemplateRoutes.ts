import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { ConsentTemplate } from './../models/consentTemplate/ConsentTemplateEntity';
import { ConsentTemplateService, IConsentTemplateSearch } from './../services/ConsentTemplateService';

const consentTemplateRoutes = Router();

consentTemplateRoutes.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IConsentTemplateSearch;

        const consentTemplateService = new ConsentTemplateService(database);
        const result: ConsentTemplate[] = await consentTemplateService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

consentTemplateRoutes.post('/', async (req, res, next) => {
    try {
        const consentTemplateService = new ConsentTemplateService(database);
        const newConsentTemplate: ConsentTemplate = plainToInstance(ConsentTemplate, req.body);
        const result: ConsentTemplate = await consentTemplateService.create(newConsentTemplate);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default consentTemplateRoutes;
