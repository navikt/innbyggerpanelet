import { validate } from 'class-validator';
import { Connection, Repository } from 'typeorm';
import { NotAcceptableError } from '../lib/errors/http/NotAcceptableError';
import { NotFoundError } from '../lib/errors/http/NotFoundError';
import { ServerErrorMessage } from '../lib/errors/messages/ServerErrorMessages';
import { Insight } from '../models/insight/InsightEntity';
import { InsightProject } from '../models/insightProject/InsightProjectEntity';
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
        this._insightProjectRepository = this._database.getRepository(InsightProject);
    }

    async get(): Promise<InsightProject[]> {
        const insightProjects = await this._insightProjectRepository.find();

        if (insightProjects.length === 0)
            throw new NotFoundError({ message: ServerErrorMessage.notFound('Insight projects') });

        return insightProjects;
    }

    async getById(id: number): Promise<InsightProject> {
        const insightProject = await this._insightProjectRepository.findOne(id);

        if (!insightProject) throw new NotFoundError({ message: ServerErrorMessage.notFound('Insight project') });

        return insightProject;
    }

    async search(queries: IInsightProjectSearch): Promise<InsightProject[] | undefined> {
        const insightProjects = await this._insightProjectRepository.find({
            where: queries.where,
            relations: [queries.relations || []].flat()
        });

        if (insightProjects.length === 0)
            throw new NotFoundError({ message: ServerErrorMessage.notFound('Insight projects') });

        return insightProjects;
    }

    async create(dto: InsightProject): Promise<InsightProject> {
        const errors = await validate(dto);
        if (errors.length > 0) throw new NotAcceptableError({ message: ServerErrorMessage.invalidData(errors) });

        const insightProject = await this._insightProjectRepository.save(dto);

        return insightProject;
    }

    async getByCurrentUser(employeeId: string | number): Promise<InsightProject[]> {
        const insightProjects = await this._insightProjectRepository
            .createQueryBuilder('insightProject')
            .leftJoinAndSelect('insightProject.members', 'employee')
            .where('employee.id = :employeeId', { employeeId })
            .getMany();

        if (insightProjects.length === 0)
            throw new NotFoundError({ message: ServerErrorMessage.notFound('Insight projects') });

        return insightProjects;
    }

    async getInsightsInProject(projectId: number): Promise<Insight[]> {
        const insights = await this._insightProjectRepository.findOne(projectId);

        if (insights.length === 0) throw new NotFoundError({ message: ServerErrorMessage.notFound('Insight') });

        return insights.insights;
    }

    async update(id: number, dto: InsightProject): Promise<InsightProject> {
        throw new Error('Method not implemented.');
    }

    async delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
