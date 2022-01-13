import { ConnectionOptions, createConnection } from 'typeorm';
import { Candidate, Consent, Insight, Trait } from '../entities';

const entities = [Trait, Insight, Consent, Candidate];

export default async () => {
    const typeormConfig: ConnectionOptions = {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        synchronize: true,
        entities: entities,
    };

    const connection = await createConnection(typeormConfig);

    return connection;
};