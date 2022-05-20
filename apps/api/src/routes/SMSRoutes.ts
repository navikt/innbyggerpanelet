import { ISMS } from '@innbyggerpanelet/api-interfaces';
import { Router } from 'express';
import kafka from '../loaders/kafka';
import { SMSService } from '../services/SMSService';

const smsRouter = Router();

smsRouter.post('/', async (req, res, next) => {
    try {
        const smsService = new SMSService(kafka);

        const newSMS = req.body as ISMS;

        await smsService.sendSMS(newSMS);
    } catch (error) {
        next(error);
    }
});