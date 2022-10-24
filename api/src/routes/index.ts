import { Router } from 'express'
import candidateRoutes from './CandidateRoutes'
import citizenRoutes from './CitizenRoutes'
import consentRoutes from './ConsentRoutes'
import consentTemplateRoutes from './ConsentTemplateRoutes'
import criteriaCategoryRoutes from './CriteriaCategoryRoutes'
import criteriaRoutes from './CriteriaRoutes'
import employeeRoutes from './EmployeeRoutes'
import insightProjectRoutes from './InsightProjectRoutes'
import insightRoutes from './InsightRoutes'
import messageRoutes from './MessageRoutes'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './middleware/httpLogging'
import smsRoutes from './SmsRoutes'
import config from '../config'

const routes = Router()
    .use(logger)
    .use('/candidate', candidateRoutes)
    .use('/consent', consentRoutes)
    .use('/consentTemplate', consentTemplateRoutes)
    .use('/citizen', citizenRoutes)
    .use('/criteria', criteriaRoutes)
    .use('/criteriaCategory', criteriaCategoryRoutes)
    .use('/employee', employeeRoutes)
    .use('/insight', insightRoutes)
    .use('/insightProject', insightProjectRoutes)
    .use('/sms', smsRoutes)
    .use('/message', messageRoutes)
    .use(errorHandler)

export default Router()
    .use('/isAlive', (req, res) => {
        res.send('Alive').status(200)
    })
    .use('/isReady', (req, res) => {
        res.send('Ready').status(200)
    })
    .use(routes)
