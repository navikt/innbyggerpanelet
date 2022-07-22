import { differenceInMilliseconds } from 'date-fns';

interface IScheduleLoggerTimer {
    [key: string]: Date;
}

const timestamps: IScheduleLoggerTimer = {};

const scheduleStart = (name: string) => {
    timestamps[name] = new Date();
    console.log(`SCHEDULE "${name}" has started.`);
};

export enum EnumScheduleTypes {
    Create = 'created',
    Delete = 'deleted',
    Update = 'updated'
}

const scheduleStop = (name: string, entityName: string, quantity: number, operation: string) => {
    const duration = differenceInMilliseconds(new Date(), timestamps[name]);
    console.log(
        `SCHEDULE "${name}" has stopped after ${duration}ms. ${quantity} ${entityName}(s) has been ${operation}.`
    );
};

const scheduleInterrupted = (name: string) => {
    const duration = differenceInMilliseconds(new Date(), timestamps[name]);

    console.log(`SCHEDULE "${name}" has stopped after ${duration}ms. No changes were made.`);
};

const cronLogger = { scheduleStart, scheduleStop, scheduleInterrupted };

export default cronLogger;
