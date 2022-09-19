import { Counter } from 'prom-client';
import Transport from 'winston-transport';
import prometheus from './prometheus';

export class PrometheusTransport extends Transport {
    private readonly register = null;
    private counter = null;

    constructor() {
        super();

        this.register = prometheus.register;
        this.counter = new Counter({
            name: 'winston_events_total',
            help: 'All log entries passed to winston, labelled with log level',
            labelNames: ['level'],
            registers: [this.register]
        });
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit('logged', info);

            this.counter.inc({ level: info.level });

            callback();
        });
    }
}
