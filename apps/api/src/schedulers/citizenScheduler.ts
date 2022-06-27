import { add } from 'date-fns';
import cron from 'node-cron';
import { database } from '../loaders';
import { CitizenService } from './../services/CitizenService';
import { MessageService } from './../services/MessageService';

const citizenExpirationDateNotification = cron.schedule('0 0 * * *', async () => {
    const dateOneMonthFromNow = add(new Date(), { months: 1 }).toISOString().slice(0, 10);
    console.log(dateOneMonthFromNow);

    const citizenService = new CitizenService(database);
    const citizens = await citizenService.getCitizensWithExpirationDate(dateOneMonthFromNow);

    const messageService = new MessageService(database);
    const messages = await messageService.createCitizenExpirationNotification(citizens);

    console.log(messages);
});

const citizenSchedules = () => {
    citizenExpirationDateNotification.start();
};

export default citizenSchedules;
