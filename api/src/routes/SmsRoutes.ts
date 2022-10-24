import { Router, Request, Response, NextFunction } from 'express'
import kafka from '../loaders/kafka'
import { SmsService } from '../services/SmsService'
import { navAuthenticated } from './middleware/authentication'

const smsRoutes = Router()

smsRoutes.post('/', navAuthenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const smsService = new SmsService(kafka)

        const newSms = req.body

        smsService.send(newSms)

        res.json({ message: 'SMS sent' })
    } catch (error) {
        next(error)
    }
})

export default smsRoutes
