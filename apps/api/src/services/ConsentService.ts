import { Connection, Repository } from 'typeorm';
import { Consent } from '../models/consent/ConsentEntity';
import BaseService from './BaseService';

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

    async getById(id: number): Promise<Consent | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: Consent): Promise<Consent | undefined> {
        throw new Error('not implemented');
    }

    async update(id: number, dto: Consent): Promise<Consent | undefined> {
        throw new Error('not implemented');
    }
    
    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}