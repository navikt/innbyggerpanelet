import { plainToInstance } from 'class-transformer';
import { Connection } from 'typeorm';
import { InsightProject } from '../../../models/insightProject/InsightProjectEntity';

export const createDummyInsightProject = async (connection: Connection): Promise<InsightProject> => {
    const repository = connection.getRepository(InsightProject);

    const insightProject = repository.create(plainToInstance(InsightProject, {
        id: 1,
        name: 'Insight project 2000',
        description: 'The best insight project god has ever seen',
        members: [],
        start: '2022-07-12',
        end: '2022-07-22'
    }));

    return await repository.save(insightProject);
};

export const deleteDummyInsightProject = async (connection: Connection, insightProjects: Array<InsightProject>) => {
    const repository = connection.getRepository(InsightProject);
    await repository.remove(insightProjects);
};