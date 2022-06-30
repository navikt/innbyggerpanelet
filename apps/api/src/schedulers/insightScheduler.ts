import cron from 'node-cron';
import { database } from '../loaders';
import { InsightService } from './../services/InsightService';
import { MessageService } from './../services/MessageService';

const insightExpiredNotifyEmployees = cron.schedule('0 0 * * *', async () => {
    const dateToday = new Date().toISOString().slice(0, 10);

    const insightService = new InsightService(database);
    const insights = await insightService.search({
        where: { end: dateToday },
        relations: ['project', 'project.members']
    });

    console.log(insights);

    const messageService = new MessageService(database);
    const messages = await messageService.createInsightExpirationNotification(insights);

    console.log(messages);
});

const insightSchedules = () => {
    insightExpiredNotifyEmployees.start();
};

export default insightSchedules;
