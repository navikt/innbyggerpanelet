import { Router } from 'express';
import candidateRoutes from './CandidateRoutes';
import consentRoutes from './ConsentRoutes';
import insightRoutes from './InsightRoutes';
import criteriaRoutes from './CriteriaRoutes';
import criteriaCategoryRoutes from './CriteriaCategoryRoutes';
import insightProjectRoutes from './InsightProjectRoutes';
import userRoutes from './UserRoutes';

const routes = Router()
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRoutes)
    .use('/criteria', criteriaRoutes)
    .use('/criteriaCategory', criteriaCategoryRoutes)
    .use('/insight', insightRoutes)
    .use('/insightProject', insightProjectRoutes)
    .use('/user', userRoutes);

export default Router().use('/api', routes);
