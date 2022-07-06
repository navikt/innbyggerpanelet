import { Connection, FindOperator, ILike, Repository } from 'typeorm';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Consent } from '../models/consent/ConsentEntity';
import BaseService from './BaseService';

export interface IConsentSearch {
    where: {
        description?: string | string[] | FindOperator<string | string[]>;
    };
    relations: string | string[];
}
export class ConsentService extends BaseService<Consent> {
    private _database: Connection;
    private _consentRepository: Repository<Consent>;

    constructor(db: Connection) {
        super(db, Consent);
        this._database = db;
        this._consentRepository = this._database.getRepository(Consent);
    }

    async get(): Promise<Consent[] | undefined> {
        throw new Error('not implemented');
    }

    async search(queries: IConsentSearch): Promise<Consent[] | undefined> {
        if (queries.where && queries.where.description) queries.where.description = ILike(queries.where.description);

        const consents = await this._consentRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (consents.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Consents') });

        return consents;
    }

    async getById(id: number): Promise<Consent | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: Consent): Promise<Consent | undefined> {
        return await this._consentRepository.save(dto);
    }

    async update(id: number, dto: Consent): Promise<Consent | undefined> {
        throw new Error('not implemented');
    }

    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}
