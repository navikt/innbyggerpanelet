import * as dotenv from 'dotenv';
import express = require('express');
import { load } from './loaders';

console.log('======== BOOTING UP API ========');

async function boot() {
    try {
        dotenv.config();

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
