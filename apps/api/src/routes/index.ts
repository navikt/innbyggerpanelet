import { Router } from 'express';
import candidateRoutes from './CandidateRoutes';
import consentRoutes from './ConsentRoutes';
import insightRoutes from './InsightRoutes';
import criteriaRoutes from './CriteriaRoutes';

const routes = Router()
    .use('/isAlive', (req, res) => {
        res.status(200)
    })
    .use('/isReady', (req, res) => {
        res.status(200)
    })
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRoutes)
    .use('/insight', insightRoutes)
    .use('/criteria', criteriaRoutes);

export default Router().use('/api', routes);
