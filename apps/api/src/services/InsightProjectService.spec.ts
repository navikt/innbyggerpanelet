import { IInsightProject } from '@innbyggerpanelet/api-interfaces';
import { Connection } from 'typeorm';
import { InsightProject } from '../models/insightProject/InsightProjectEntity';
import { InsightProjectService } from '../services/InsightProjectService';
import { getTestDatabase } from '../utils/test/databaseConnection';
import { clearDatabaseEntityTable } from '../utils/test/clearDatabaseEntityTable';
import { createDummyInsightProject, deleteDummyInsightProject } from '../utils/test/seed/insightProject';
import { plainToInstance } from 'class-transformer';
import { Employee } from '../models/employee/EmployeeEntity';
import { createDummyEmployee } from '../utils/test/seed/employee';

let db: Connection;
let insightProjectService: InsightProjectService;
let insightProject: InsightProject;
let seedDTO: IInsightProject;
let employee: Employee;

beforeAll(async () => {
    db = await getTestDatabase();
    insightProject = await createDummyInsightProject(db);

    seedDTO = {
        id: Math.floor(Math.random() * 100_000),
        name: 'Insight project 2000',
        description: 'The best insight project god has ever seen',
        members: [],
        start: '2022-07-12',
        end: '2022-07-22',
        insights: []
    };

    insightProjectService = new InsightProjectService(db);
});

beforeEach(async () => {
    insightProjectService = new InsightProjectService(db);
    await clearDatabaseEntityTable(db.getRepository(InsightProject));
    await clearDatabaseEntityTable(db.getRepository(Employee));
    employee = await createDummyEmployee(db);
});

afterAll(async () => {
    try {
        const repository = db.getRepository(InsightProject);
        await clearDatabaseEntityTable(repository);
        await deleteDummyInsightProject(db, [insightProject]);
        await db.close();
    } catch (err) {
        console.error(err);
    }
});

it('should create a insight project with all data filled out', async () => {
    const insightProject: InsightProject = await insightProjectService.create(plainToInstance(InsightProject, {
        id: Math.floor(Math.random() * 100_000),
        name: 'Skjermlesertest for nav.no',
        description: 'En brukertest for å teste hvordan skjermelesere fungerer på nav.no',
        members: [employee],
        start: '2022-07-12',
        end: '2022-07-22',
        insights: []
    }));
    expect(insightProject).toBeInstanceOf(InsightProject);
});