import * as dotenv from 'dotenv';
import express = require('express');
import { load } from './loaders';
import { logger } from './loaders/logger';

logger.info('======== BOOTING UP API ========');

async function boot() {
    try {
        dotenv.config();

        const server = express();

        await load({ server });

        server.listen(2022, () => {
            logger.info(`Listening on ${2022}`);
            logger.info('======== API STARTED ========');
        });
    } catch (error) {
        logger.error('\n\n=========== 💥  TERROR 💥  ============\n\n');
        logger.error(error);
    }
}

void boot();
