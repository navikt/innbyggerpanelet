import { Connection, Repository } from 'typeorm';
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
        try {
            const insights = await this._insightRepository.find();

            return insights;
        } catch (err) {
            console.error(err);
        }
    }

    async getById(id: number): Promise<Insight> {
        throw new Error('Method not implemented.');
    }

    async search(queries: IInsightSearch): Promise<Insight[]> {
        try {
            const insights = await this._insightRepository.find({
                where: queries.where,
                relations: [queries.relations || []].flat(),
            });

            return insights;
        } catch (error) {
            console.log(error);
        }
    }

    async create(dto: Insight): Promise<Insight> {
        try {
            const insight = await this._insightRepository.save(dto);

            return insight;
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: number, dto: Insight): Promise<Insight> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
