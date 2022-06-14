import { Kafka } from 'kafkajs';
import { buildKeyInput } from '../builders/kafkaKeyBuilder';
import { v4 as uuidv4 } from 'uuid';
import { buildMessage } from '../builders/messageBuilder';
import config from '../config';

export class SmsService {
    private _kafkaConnection: Kafka;

    constructor(kafkaConnection: Kafka) {
        this._kafkaConnection = kafkaConnection;
    }

    async send({birthNumber, message}: {birthNumber: string, message: string}): Promise<void> {
        try {
            const producer = this._kafkaConnection.producer();

            await producer.connect();
            await producer.send({
                topic: config.kafka.topic,
                messages: [{
                    key: buildKeyInput({
                        eventId: uuidv4(),
                        groupingId: Math.random().toString(),
                        birthNumber,
                        namespace: config.nais.namespace,
                        appName: config.nais.appName
                    }),
                    value: buildMessage({
                        time: Date.now() + 900, // Epoch time + 15 seconds
                        visibleUntill: Date.now() + 900, // Epoch time + 15 seconds
                        externalWarning: true,
                        smsMessage: message,
                        message,
                        safetyLevel: 4,
                        emailMessage: undefined,
                        emailTitle: undefined
                    })
                }]
            });

            await producer.disconnect();
        } catch (error) {
            throw new Error('Noe gikk galt ved utsenting av sms...')
        }
    }
}