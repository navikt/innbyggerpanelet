import { ISMS } from '@innbyggerpanelet/api-interfaces';
import { Kafka } from 'kafkajs';
import config from '../config';

export class SMSService {
    
    private _kafka: Kafka;

    constructor(kafka: Kafka) {
        this._kafka = kafka;
    }

    async sendSMS(sms: ISMS) {
        const producer = this._kafka.producer();

        try {
            await producer.connect();
            
            await producer.send({
                topic: config.kafka.smsTopic,
                messages: [
                    { value: sms.text }
                ]
            });

            await producer.disconnect();
        } catch (error) {
            // TODO: add propper error handler from kafka stream
            throw new Error(error);
        }
    }
}