import { Kafka, logLevel } from 'kafkajs';

export default new Kafka({
    clientId: 'innbyggerpanelet',
    brokers: ['kafka.dittnav.docker-internal:9092'],
    logLevel: logLevel.ERROR
});