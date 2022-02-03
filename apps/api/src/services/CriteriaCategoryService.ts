import { Connection, Repository } from 'typeorm';
import { CriteriaCategory } from '../models/criteriaCategory/CriteriaCategoryEntity';
import BaseService from './BaseService';

export class CriteriaCategoryService extends BaseService<CriteriaCategory> {
    private _database: Connection;
    private _criteriaCategoryRepository: Repository<CriteriaCategory>;

    constructor(db: Connection) {
        super(db, CriteriaCategory);
        this._database = db;
        this._criteriaCategoryRepository =
            this._database.getRepository(CriteriaCategory);
    }

    async get(): Promise<CriteriaCategory[] | undefined> {
        try {
            const categories = await this._criteriaCategoryRepository
                .createQueryBuilder('criteriaCategory')
                .getMany();

            return categories;
        } catch (err) {
            console.error(err);
        }
    }

    async getById(id: number): Promise<CriteriaCategory | undefined> {
        throw new Error('not implemented');
    }

    async create(dto: CriteriaCategory): Promise<CriteriaCategory | undefined> {
        try {
            const category = await this._criteriaCategoryRepository.save(dto);

            return category;
        } catch (err) {
            console.error(err);
        }
    }

    async update(
        id: number,
        dto: CriteriaCategory
    ): Promise<CriteriaCategory | undefined> {
        throw new Error('not implemented');
    }

    async delete(id: number): Promise<void> {
        throw new Error('not implemented');
    }
}
