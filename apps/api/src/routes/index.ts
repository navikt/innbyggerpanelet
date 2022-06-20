import { Router } from 'express';
import azureADRoutes from './AzureADRoutes';
import candidateRoutes from './CandidateRoutes';
import consentRoutes from './ConsentRoutes';
import criteriaCategoryRoutes from './CriteriaCategoryRoutes';
import criteriaRoutes from './CriteriaRoutes';
import insightProjectRoutes from './InsightProjectRoutes';
import insightRoutes from './InsightRoutes';
import messageRoutes from './MessageRoutes';
import { errorHandler } from './middleware/errorHandler';
import { httpLogger } from './middleware/httpLogging';
import smsRoutes from './SmsRoutes';
import userRoutes from './UserRoutes';

const routes = Router()
    .use(httpLogger)
    .use('/azure', azureADRoutes)
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRoutes)
    .use('/criteria', criteriaRoutes)
    .use('/criteriaCategory', criteriaCategoryRoutes)
    .use('/insight', insightRoutes)
    .use('/insightProject', insightProjectRoutes)
    .use('/user', userRoutes)
    .use('/sms', smsRoutes)
    .use('/message', messageRoutes)
    .use(errorHandler);

export default Router()
    .use('/isAlive', (req, res) => {
        res.send('Alive').status(200);
    })
    .use('/isReady', (req, res) => {
        res.send('Ready').status(200);
    })
    .use('/api', routes);
