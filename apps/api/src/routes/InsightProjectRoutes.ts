import { IInsight } from '@innbyggerpanelet/api-interfaces';
import { plainToInstance } from 'class-transformer';
import { Router } from 'express';
import { database } from '../loaders';
import { InsightProject } from '../models/insightProject/InsightProjectEntity';
import { IInsightProjectSearch, InsightProjectService } from '../services/';
import { navAuthenticated } from './middleware/authenticationHandler';

const insightProjectRoutes = Router();

insightProjectRoutes.get('/', async (req, res, next) => {
    try {
        const queries = req.query as unknown as IInsightProjectSearch;

        const insightProjectService = new InsightProjectService(database);

        const result: InsightProject[] | undefined = await insightProjectService.search(queries);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

insightProjectRoutes.get('/currentUser', navAuthenticated, async (req, res, next) => {
    try {
        const { id } = req.user;

        const insightProjectService = new InsightProjectService(database);

        const result: InsightProject[] | undefined = await insightProjectService.getByCurrentUser(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

insightProjectRoutes.get('/insights/:projectId', async (req, res, next) => {
    try {
        const id = parseInt(req.params.projectId);

        const insightProjectService = new InsightProjectService(database);

        const result: IInsight[] | undefined = await insightProjectService.getInsightsInProject(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

insightProjectRoutes.get('/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        const insightProjectService = new InsightProjectService(database);
        const result: InsightProject | undefined = await insightProjectService.getById(id);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

insightProjectRoutes.post('/', async (req, res, next) => {
    try {
        const insightProjectService = new InsightProjectService(database);
        const newInsightProject = plainToInstance(InsightProject, req.body);
        const result = await insightProjectService.create(newInsightProject);

        res.json(result);
    } catch (error) {
        next(error);
    }
});

export default insightProjectRoutes;
