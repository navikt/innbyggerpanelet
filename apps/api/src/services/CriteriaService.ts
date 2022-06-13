import { validate } from 'class-validator';
import { Connection, FindOperator, ILike, QueryFailedError, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { ValidationErrorMessage } from '../lib/errors/messages/ValidationErrorMessages';
import { Criteria } from '../models/criteria/CriteriaEntity';
import BaseService from './BaseService';

export interface ICriteriaSearch {
    where: {
        category?: string | string[];
        name?: string | string[] | FindOperator<string | string[]>;
    };
    relations: string | string[];
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
        const criterias = await this._criteriaRepository.createQueryBuilder('criteria').getMany();

        if (criterias.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Criteria') });

        return criterias;
    }

    async search(queries: ICriteriaSearch): Promise<Criteria[] | undefined> {
        // TODO: Make general solution for all special fields
        // Case insensitive string search
        if (queries.where && queries.where.name) {
            queries.where.name = ILike(queries.where.name);
        }

        // Currently doesn't support OR and sorting
        const criterias = await this._criteriaRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (criterias.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Criteria') });

        return criterias;
    }

    async getById(id: number): Promise<Criteria | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: Criteria): Promise<Criteria | undefined> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });

        const criteria = await this._criteriaRepository.save(dto);

        return criteria;
    }

    async update(id: number, dto: Criteria): Promise<Criteria | undefined> {
        try {
            return await this._criteriaRepository.save(dto);
        } catch (error) {
            if (error instanceof QueryFailedError)
                throw new NotAcceptableError({ message: ValidationErrorMessage.alreadyExists('Criteria') });
        }
    }

    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}
