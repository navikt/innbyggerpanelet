import * as dotenv from 'dotenv'
import { load } from './loaders'
import { logger } from './loaders/logger'
import express = require('express')

logger.info('======== BOOTING UP API ========')

async function boot() {
    try {
        dotenv.config()

        const server = express()

        await load({ server })

        server.listen(8080, () => {
            logger.info(`Listening on ${8080}`)
            logger.info('======== API STARTED ========')
        })
    } catch (error) {
        logger.error('\n\n=========== 💥  TERROR 💥  ============\n\n')
        logger.error(error)
    }
}

void boot()
