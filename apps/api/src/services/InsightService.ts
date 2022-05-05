import { Connection, Repository } from 'typeorm';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Insight } from '../models/insight/InsightEntity';
import BaseService from './BaseService';

export interface IInsightSearch {
    where: {
        project: string | string[];
    };
    relations: string | string[];
}

export class InsightService extends BaseService<Insight> {
    private _database: Connection;
    private _insightRepository: Repository<Insight>;

    constructor(db: Connection) {
        super(db, Insight);
        this._database = db;
        this._insightRepository = this._database.getRepository(Insight);
    }

    async get(): Promise<Insight[]> {
        const insights = await this._insightRepository.find();
        
        if (insights.length === 0) throw new NotFoundError({message: ServerErrorMessage.notFound('Insights')});

        return insights;
    }

    async getById(id: number): Promise<Insight> {
        throw new Error('Method not implemented.');
    }

    async search(queries: IInsightSearch): Promise<Insight[]> {
        const insights = await this._insightRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat(),
        });

        if (insights.length === 0) throw new NotFoundError({message: ServerErrorMessage.notFound('Insights')});

        return insights;
    }

    async create(dto: Insight): Promise<Insight> {
        const insight = await this._insightRepository.save(dto);

        return insight;
    }

    async update(id: number, dto: Insight): Promise<Insight> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
