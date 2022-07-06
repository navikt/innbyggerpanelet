import { Connection } from 'typeorm';
import typeorm from '../../loaders/typeorm';

export const getTestDatabase = async (): Promise<Connection> => {
    return await typeorm();
};