import { plainToInstance } from 'class-transformer'
import { Router } from 'express'
import { database } from '../loaders'
import { Message } from '../models/message/MessageEntity'
import { MessageService } from '../services/MessageService'

const messageRoutes = Router()

messageRoutes.get('/', async (req, res, next) => {
    try {
        //const { id } = req.user;

        const messageService = new MessageService(database)
        const result: Message[] = await messageService.getByUserId(String(0))

        res.json(result)
    } catch (error) {
        next(error)
    }
})

messageRoutes.put('/read', async (req, res, next) => {
    try {
        //const { id } = req.user;

        const messageService = new MessageService(database)
        const readMessage = plainToInstance(Message, { ...req.body, read: true })
        const result = await messageService.update(String(0), readMessage)

        res.json(result)
    } catch (error) {
        next(error)
    }
})

export default messageRoutes
