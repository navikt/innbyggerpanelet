import { ConnectionOptions, createConnection } from 'typeorm';
import config from '../config';
import models from '../models';
import dotenv from 'dotenv'

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        database: 'innbyggerpanelet-dbs',
        username: 'innbyggerpanelet-api',
        password: process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_DBS_PASSWORD,
        synchronize: true,
        entities: models,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};
