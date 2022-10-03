import { Application } from 'express'
import { Connection } from 'typeorm'
import expressLoader from '../loaders/express'
import typeormLoader from '../loaders/typeorm'
import setupScheduler from '../schedulers'
import kafka from './kafka'
import { logger } from './logger'

let database!: Connection

let loaded = false
export const load = async ({ server }: { server: Application }) => {
    if (loaded) throw new Error('API is already loaded...')

    logger.info('-- loading express... --')
    const loadedExpress = await expressLoader({ server })
    logger.info('------ EXPRESS LOADED')

    logger.info('-- loading typeORM... --')
    const loadedTypeOrm = await typeormLoader()
    logger.info('------ TYPEORM LOADED')

    database = loadedTypeOrm

    logger.info('-- loading kafka... --')
    const loadedKafka = kafka
    logger.info('------ KAFKA LOADED')

    logger.info('-- loading cron... --')
    setupScheduler()
    logger.info('------ CRON LOADED')

    loaded = true

    return { loadedExpress, loadedTypeOrm, loadedKafka }
}

export { database }
