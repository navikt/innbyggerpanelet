import * as dotenv from 'dotenv';
import express = require('express');
import { load } from './loaders';

console.log('======== BOOTING UP API ========');

async function boot() {
    try {
        dotenv.config();

        console.log(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_HOST)
        console.log(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_PORT)
        console.log(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_DATABASE)
        console.log(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_USERNAME)
        console.log(process.env.NAIS_DATABASE_INNBYGGERPANELET_API_INNBYGGERPANELET_API_DB_PASSWORD)

        const server = express();

        await load({ server });

        server.listen(process.env.HTTP_PORT || 3333, () => {
            console.log(`Listening on ${process.env.HTTP_PORT}`);
            console.log('======== API STARTED ========');
        });
    } catch (error) {
        console.log('\n\n=========== 💥  TERROR 💥  ============\n\n');
        console.log(error);
    }
}

void boot();
