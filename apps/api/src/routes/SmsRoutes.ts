import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import kafka from '../loaders/kafka';
import { SmsService } from '../services/SmsService';

const smsRoutes = Router();

smsRoutes.post('/', async (req, res, next) => {
    try {
        const smsService = new SmsService(kafka);

        const newSms = req.body;

        smsService.send(newSms);

        res.status(StatusCodes.OK);
    } catch (error) {
        next(error);
    }
});

export default smsRoutes;