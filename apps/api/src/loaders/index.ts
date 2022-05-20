import { Application } from 'express';
import { Connection } from 'typeorm';
import expressLoader from '../loaders/express';
import typeormLoader from '../loaders/typeorm';
import { logger } from './logger';
import passportLoader from './passport';
import kafkaLoader from './kafka';
import { Kafka } from 'kafkajs';

let database!: Connection;
let kafka!: Kafka;

let loaded = false;
export const load = async ({ server }: { server: Application }) => {
    if (loaded) throw new Error('API is already loaded...');

    logger.info('-- loading express... --');
    const loadedExpress = await expressLoader({ server });
    logger.info('------ EXPRESS LOADED');

    logger.info('-- loading typeORM... --');
    const loadedTypeOrm = await typeormLoader();
    logger.info('------ TYPEORM LOADED');

    database = loadedTypeOrm;

    logger.info('-- loading passport... --');
    const loadedPassport = await passportLoader();
    logger.info('------ PASSPORT LOADED');

    logger.info('-- loading kafka... --');
    const loadedKafka = kafkaLoader;
    logger.info('------ KAFKA LOADED');

    kafka = loadedKafka;

    loaded = true;

    return { loadedExpress, loadedPassport, loadedTypeOrm, loadedKafka };
};

export { database, kafka };
