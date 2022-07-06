import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Connection } from 'typeorm';
import { InsightProjectService } from '../services/InsightProjectService';
import { getTestDatabase } from '../utils/test/databaseConnection';

let db: Connection;
let insightProjectService: InsightProjectService;
let seedDTO: IInsightProject;

beforeAll(async () => {
    console.log(process.env.NODE_ENV);
    db = await getTestDatabase();

    seedDTO = {
        id: Math.floor(Math.random() * 100_000),
        name: 'Insight project 2000',
        description: 'The best insight project god has ever seen',
        members: [],
        start: '2022-07-12',
        end: '2022-07-22'
    };
});

it('should be same', () => {
    expect('yes').toBe('yes');
});