import { Kafka, logLevel } from 'kafkajs'
import config from '../config'

export default new Kafka({
    clientId: config.nais.appName,
    brokers: [config.kafka.broker!],
    logLevel: logLevel.ERROR,
})
