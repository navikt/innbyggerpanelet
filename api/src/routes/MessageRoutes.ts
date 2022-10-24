import { plainToInstance } from 'class-transformer'
import { NextFunction, Request, Response, Router } from 'express'
import { database } from '../loaders'
import { Message } from '../models/message/MessageEntity'
import { MessageService } from '../services/MessageService'
import { authenticated } from './middleware/authentication'

const messageRoutes = Router()

messageRoutes.get('/', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const messageService = new MessageService(database)
        const result: Message[] = await messageService.getByUserId(id)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

messageRoutes.put('/read', authenticated, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.user

        const messageService = new MessageService(database)
        const readMessage = plainToInstance(Message, { ...req.body, read: true })
        const result = await messageService.update(id, readMessage)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default messageRoutes
