import { Router } from 'express';
import kafka from '../loaders/kafka';
import { SmsService } from '../services/SmsService';

const smsRoutes = Router();

smsRoutes.post('/', async (req, res, next) => {
    try {
        const smsService = new SmsService(kafka);

        const newSms = req.body;

        smsService.send(newSms);

    } catch (error) {
        next(error);
    }
});

export default smsRoutes;