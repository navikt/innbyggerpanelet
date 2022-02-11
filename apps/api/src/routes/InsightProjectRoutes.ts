import { Router } from 'express';
import { database } from '../loaders';
import { InsightProject } from '../models/insightProject/InsightProjectEntity';
import { IInsightProjectSearch, InsightProjectService } from '../services/';

const insightProjectRoutes = Router();

insightProjectRoutes.get('/', async (req, res) => {
    try {
        const queries = req.query as unknown as IInsightProjectSearch;

        const insightProjectService = new InsightProjectService(database);

        const result: InsightProject[] | undefined =
            await insightProjectService.search(queries);
        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

insightProjectRoutes.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const insightProjectService = new InsightProjectService(database);
        const result: InsightProject | undefined =
            await insightProjectService.getById(id);

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

insightProjectRoutes.post('/', async (req, res) => {
    try {
        const insightProjectService = new InsightProjectService(database);
        const newInsightProject = req.body as InsightProject;

        const result = await insightProjectService.create(newInsightProject);

        res.json(result);
    } catch (error) {
        console.error(error);
    }
});

export default insightProjectRoutes;
