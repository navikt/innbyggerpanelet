import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { Consent } from '../models/consent/ConsentEntity';
import { ConsentService, IConsentSearch } from '../services/ConsentService';

const consentRoutes = Router();

consentRoutes.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IConsentSearch;

        const consentService = new ConsentService(database);
        const result: Consent[] = await consentService.search(queries);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

consentRoutes.post('/', async (req, res, next) => {
    try {
        const consentService = new ConsentService(database);
        const newConsent = plainToInstance(Consent, req.body);

        const result = await consentService.create(newConsent);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default consentRoutes;
