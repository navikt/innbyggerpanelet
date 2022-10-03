import cron from 'node-cron'
import { database } from '../loaders'
import { InsightService } from './../services/InsightService'
import { MessageService } from './../services/MessageService'
import cronLogger, { EnumScheduleTypes } from './cronLogging'

const insightExpiredNotifyEmployees = cron.schedule('0 0 * * *', async () => {
    cronLogger.scheduleStart('Insight Expiration Notification')

    const dateToday = new Date().toISOString().slice(0, 10)

    try {
        const insightService = new InsightService(database)
        const insights = await insightService.search({
            where: { end: dateToday },
            relations: ['project', 'project.members'],
        })

        const messageService = new MessageService(database)
        const messages = await messageService.createInsightExpirationNotification(insights)
        cronLogger.scheduleStop(
            'Insight Expiration Notification',
            'Message',
            messages!.length,
            EnumScheduleTypes.Create,
        )
    } catch (error) {
        cronLogger.scheduleInterrupted('Insight Expiration Notification')
    }
})

const setupInsightSchedules = () => {
    insightExpiredNotifyEmployees.start()
}

export default setupInsightSchedules
