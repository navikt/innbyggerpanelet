import { Router } from 'express';

const smsRouter = Router();

smsRouter.post('/', async (req, res, next) => {
    try {
        const newSms = req.body;
    } catch (error) {
        next(error);
    }
});