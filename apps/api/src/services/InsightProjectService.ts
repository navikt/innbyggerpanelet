import { Connection, Repository } from 'typeorm';
import { InsightProject } from '../models/insightProject/InsightProjectEntity';
import { User } from '../models/user/UserEntity';
import BaseService from './BaseService';

export interface IInsightProjectSearch {
    where: {
        id: string | string[];
    };
    relations: string | string[];
}

export class InsightProjectService extends BaseService<InsightProject> {
    private _database: Connection;
    private _insightProjectRepository: Repository<InsightProject>;

    constructor(db: Connection) {
        super(db, InsightProject);
        this._database = db;
        this._insightProjectRepository =
            this._database.getRepository(InsightProject);
    }

    async get(): Promise<InsightProject[]> {
        try {
            const insightProjects = await this._insightProjectRepository.find();

            return insightProjects;
        } catch (err) {
            console.error(err);
        }
    }
    async getById(id: number): Promise<InsightProject> {
        try {
            const insightProject = await this._insightProjectRepository.findOne(
                id
            );

            return insightProject;
        } catch (err) {
            console.error(err);
        }
    }

    async search(
        queries: IInsightProjectSearch
    ): Promise<InsightProject[] | undefined> {
        try {
            const insightProjects = await this._insightProjectRepository.find({
                where: queries.where,
                relations: [queries.relations || []].flat(),
            });

            return insightProjects;
        } catch (err) {
            console.error(err);
        }
    }

    async create(dto: InsightProject): Promise<InsightProject> {
        try {
            const insightProject = await this._insightProjectRepository.save(
                dto
            );

            return insightProject;
        } catch (err) {
            console.error(err);
        }
    }
    async update(id: number, dto: InsightProject): Promise<InsightProject> {
        throw new Error('Method not implemented.');
    }
    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
