import { Application } from 'express';
import { Connection } from 'typeorm';
import expressLoader from '../loaders/express';
import typeormLoader from '../loaders/typeorm';
import { logger } from './logger';

let database!: Connection;

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

    loaded = true;

    return { loadedExpress, loadedTypeOrm };
};

export { database };
