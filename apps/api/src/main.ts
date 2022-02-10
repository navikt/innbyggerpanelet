import * as dotenv from 'dotenv';
import express = require('express');
import { load } from './loaders';

console.log('======== BOOTING UP API ========');

async function boot() {
    try {
        dotenv.config();

        const server = express();

        await load({ server });

        server.listen(3333, () => {
            console.log(`Listening on ${3333}`);
            console.log('======== API STARTED ========');
        });
    } catch (error) {
        console.log('\n\n=========== 💥  TERROR 💥  ============\n\n');
        console.log(error);
    }
}

void boot();
