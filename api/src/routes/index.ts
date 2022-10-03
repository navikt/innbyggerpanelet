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
import { checkAuth } from './middleware/authentication'
import { errorHandler } from './middleware/errorHandler'
import { logger } from './middleware/httpLogging'
import smsRoutes from './SmsRoutes'
import authRoutes from './AuthRoutes'

const publicRoutes = Router().use('/auth', authRoutes)

const routes = Router()
    .use(logger)
    //.use(checkAuth)
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
    .use(publicRoutes)

export default Router()
    .use('/isAlive', (req, res) => {
        res.send('Alive').status(200)
    })
    .use('/isReady', (req, res) => {
        res.send('Ready').status(200)
    })
    .use('/api', routes)
