import { Router } from 'express';
import candidateRoutes from './CandidateRoutes';
import consentRoutes from './ConsentRoutes';
import insightRoutes from './InsightRoutes';
import criteriaRoutes from './CriteriaRoutes';
import criteriaCategoryRoutes from './CriteriaCategoryRoutes';

const routes = Router()
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRoutes)
    .use('/insight', insightRoutes)
    .use('/criteria', criteriaRoutes)
    .use('/criteriaCategory', criteriaCategoryRoutes);

export default Router().use('/api', routes);
