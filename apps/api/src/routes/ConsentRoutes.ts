import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Consent } from '../models/consent/ConsentEntity';

const consentRouter = Router();

consentRouter.get('/', async (req, res) => {
    const consents = getRepository(Consent).find();

    res.send(consents);
});

export default consentRouter;