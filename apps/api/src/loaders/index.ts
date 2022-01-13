import { Application } from 'express';
import { Connection } from 'typeorm';
import expressLoader from '../loaders/express';
import typeormLoader from '../loaders/typeorm';

let database!: Connection;

let loaded = false;
export const load = async ({ server }: { server: Application }) => {
    if (loaded) throw new Error('API is already loaded...');

    console.log('-- loading express... --');
    const loadedExpress = await expressLoader({ server });
    console.log('------ EXPRESS LOADED');

    console.log('-- loading typeORM... --');
    const loadedTypeOrm = await typeormLoader();
    console.log('------ TYPEORM LOADED');

    loaded = true;

    return { loadedExpress, loadedTypeOrm};
};

export { database };