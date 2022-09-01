import rTracer from 'cls-rtracer';
import { createLogger, format, transports } from 'winston';
import { PrometheusTransport } from './prometheusTransport';

const { Console } = transports;
const { colorize, combine, timestamp, simple, json } = format;

const production = combine(timestamp(), json());
const dev = combine(colorize(), simple());

const WinstonLogger = createLogger({
    defaultMeta: {
        get x_correlation_id() {
            return rTracer.id();
        }
    },
    level: 'info',
    format: process.env.NAIS_CLUSTER_NAME ? production : dev,
    transports: [new Console(), new PrometheusTransport()]
});

export default WinstonLogger;
