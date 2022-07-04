import { add } from 'date-fns';
import cron from 'node-cron';
import { database } from '../loaders';
import { CitizenService } from './../services/CitizenService';
import { MessageService } from './../services/MessageService';

const citizenExpirationDateNotification = cron.schedule('0 0 * * *', async () => {
    const dateOneMonthFromNow = add(new Date(), { months: 1 }).toISOString().slice(0, 10);

    const citizenService = new CitizenService(database);
    const citizens = await citizenService.getCitizensWithExpirationDate(dateOneMonthFromNow);

    if (!citizens) return;

    const messageService = new MessageService(database);
    const messages = await messageService.createCitizenExpirationNotification(citizens);
});

const citizenExpirationDateDeletion = cron.schedule('0 0 * * *', async () => {
    const dateToday = new Date().toISOString().slice(0, 10);

    const citizenService = new CitizenService(database);
    const citizens = await citizenService.getCitizensWithExpirationDate(dateToday);

    if (!citizens) return;

    await citizenService.deleteMany(citizens);
});

const setupCitizenSchedules = () => {
    citizenExpirationDateNotification.start();
    citizenExpirationDateDeletion.start();
};

export default setupCitizenSchedules;
