import winston from 'winston';

const dateFormat = 'DD-MM-YYYY - HH:mm:ss';

const transports = [];

transports.push(
    new winston.transports.Console({
        format: winston.format.combine(winston.format.cli(), winston.format.splat())
    }),
    new winston.transports.File({
        filename: 'error.log',
        level: 'error'
    }),
    new winston.transports.File({
        filename: 'all.log'
    })
);

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp({
            format: dateFormat
        }),
        winston.format.errors({ stack: true }),
        winston.format.splat(),
        winston.format.json()
    ),
    transports
});


export { logger };