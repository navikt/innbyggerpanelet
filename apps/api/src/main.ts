import * as dotenv from 'dotenv';
import express = require('express');
import { load } from './loaders';


console.log('======== BOOTING UP API ========');

dotenv.config();

async function boot() {
    try {
        const server = express();

        await load({ server });

        server.listen(process.env.HTTP_PORT, () => {
            console.log(`Listening on ${process.env.HTTP_PORT}`);
            console.log('======== API STARTED ========');
        });
    } catch (error) {
        console.log('\n\n=========== 💥  TERROR 💥  ============\n\n');
        console.log(error);
    }
}

void boot();