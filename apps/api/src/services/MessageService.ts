import { Connection, Repository } from 'typeorm';
import { ForbiddenError } from '../lib/errors/http/ForbiddenError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Message } from '../models/message/MessageEntity';
import { messageTemplates } from '../models/message/MessageTemplates';
import BaseService from './BaseService';
import { InsightService } from './InsightService';

export class MessageService extends BaseService<Message> {
    private _database: Connection;
    private _messageRepository: Repository<Message>;

    constructor(db: Connection) {
        super(db, Message);
        this._database = db;
        this._messageRepository = this._database.getRepository(Message);
    }

    async get(): Promise<Message[]> {
        throw new Error('Method not implemented.');
    }

    async getById(id: string | number): Promise<Message> {
        throw new Error('Method not implemented.');
    }

    async getByUserId(id: string | number): Promise<Message[]> {
        const messages = await this._database
            .getRepository(Message)
            .find({ where: { recipient: id }, relations: ['recipient'], order: { timestamp: 'DESC' } });

        if (messages.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Messages') });

        return messages;
    }
    async create(dto: Message): Promise<Message> {
        const message = await this._messageRepository.save(dto);

        return message;
    }

    async createAcceptCandidatureMessage(insightId: string | number): Promise<Message> {
        const insightService = new InsightService(this._database);
        const insight = await insightService.getById(insightId);

        const message = messageTemplates.candidateAccepted(insight);
        return this.create(message);
    }

    async createDeclineCandidatureMessage(insightId: string | number): Promise<Message> {
        const insightService = new InsightService(this._database);
        const insight = await insightService.getById(insightId);

        const message = messageTemplates.candidateDeclined(insight);
        return this.create(message);
    }

    // Check user id against message recipient id
    async update(id: string | number, dto: Message): Promise<Message> {
        if (id !== dto.recipient.id) throw new ForbiddenError({ message: 'Message' });

        return await this._messageRepository.save(dto);
    }

    async delete(id: string | number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}