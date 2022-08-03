import { add } from 'date-fns';
import cron from 'node-cron';
import { database } from '../loaders';
import { CandidateService } from '../services';
import { CitizenService } from './../services/CitizenService';
import { MessageService } from './../services/MessageService';
import cronLogger, { EnumScheduleTypes } from './cronLogging';

const citizenExpirationDateNotification = cron.schedule('0 0 * * *', async (now: Date) => {
    cronLogger.scheduleStart('Citizen Expiration Notification');

    const dateOneMonthFromNow = add(new Date(), { months: 1 }).toISOString().slice(0, 10);

    try {
        const citizenService = new CitizenService(database);
        const citizens = await citizenService.getCitizensWithExpirationDate(dateOneMonthFromNow);

        if (!citizens) return;

        const messageService = new MessageService(database);
        const messages = await messageService.createCitizenExpirationNotification(citizens);

        cronLogger.scheduleStop(
            'Citizen Expiration Notification',
            'Message',
            messages.length,
            EnumScheduleTypes.Create
        );
    } catch (error) {
        cronLogger.scheduleInterrupted('Citizen Expiration Notification');
    }
});

const citizenExpirationDateDeletion = cron.schedule('0 0 * * *', async () => {
    cronLogger.scheduleStart('Citizen Expiration Deletion');

    const dateToday = new Date().toISOString().slice(0, 10);

    try {
        const citizenService = new CitizenService(database);
        const citizens = await citizenService.getCitizensWithExpirationDate(dateToday);

        if (!citizens) return;

        const candidateService = new CandidateService(database);
        for (const citizen of citizens) {
            candidateService.anonymizeUser(citizen.id);
        }

        const deletedCitizens = await citizenService.deleteMany(citizens);

        cronLogger.scheduleStop(
            'Citizen Expiration Deletion',
            'User',
            deletedCitizens.length,
            EnumScheduleTypes.Delete
        );
    } catch (error) {
        cronLogger.scheduleInterrupted('Citizen Expiration Deletion');
    }
});

const setupCitizenSchedules = () => {
    citizenExpirationDateNotification.start();
    citizenExpirationDateDeletion.start();
};

export default setupCitizenSchedules;
