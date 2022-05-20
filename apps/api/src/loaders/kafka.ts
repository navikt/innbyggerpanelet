import { Kafka } from 'kafkajs';
import config from '../config';

export default new Kafka({
    clientId: config.kafka.clientId,
    brokers: [`${config.kafka.brokerId}:${config.kafka.brokerPort}`]
});