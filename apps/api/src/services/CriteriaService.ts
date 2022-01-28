import { Connection, FindOperator, ILike, Repository } from 'typeorm';
import { Criteria } from '../models/criteria/CriteriaEntity';
import BaseService from './BaseService';

export interface ICriteriaSearch {
    category?: string | string[];
    name?: string | string[] | FindOperator<string | string[]>;
}

export class CriteriaService extends BaseService<Criteria> {
    private _database: Connection;
    private _criteriaRepository: Repository<Criteria>;

    constructor(db: Connection) {
        super(db, Criteria);
        this._database = db;
        this._criteriaRepository = this._database.getRepository(Criteria);
    }

    async get(): Promise<Criteria[] | undefined> {
        try {
            const criterias = await this._criteriaRepository
                .createQueryBuilder('criteria')
                .getMany();

            return criterias;
        } catch (err) {
            console.error(err);
        }
    }

    async search(queries: ICriteriaSearch): Promise<Criteria[] | undefined> {
        try {
            // Case insensitive string search
            if (queries.name) queries.name = ILike(queries.name);

            // Currently doesn't support OR and sorting
            const criterias = await this._criteriaRepository.find({
                where: queries,
            });

            return criterias;
        } catch (err) {
            console.error(err);
        }
    }

    async getById(id: number): Promise<Criteria | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: Criteria): Promise<Criteria | undefined> {
        try {
            const criteria = await this._criteriaRepository.save(dto);

            return criteria;
        } catch (err) {
            console.error(err);
        }
    }

    async update(id: number, dto: Criteria): Promise<Criteria | undefined> {
        throw new Error('not implemented');
    }

    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}
