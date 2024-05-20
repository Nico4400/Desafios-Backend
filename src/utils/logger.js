import winston from 'winston'
import { getVariables } from '../config/config.js';
import processOptions from './process.js';

// const options = { opts: () => ({ mode: process.env.NODE_ENV }) };
const { NODE_ENV } = getVariables(processOptions);

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'magenta',
        warning: 'yellow',
        info: 'blue',
        http: 'green',
        debug: 'white'
    }
}
    
const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        })
    ]
})

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({colors: customLevelOptions.colors}),
                winston.format.simple()
            )
        }),
        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.simple()
        })
    ]
})

export const addLogger = (req, res, next) => {
    switch (NODE_ENV) {
        case 'development':
            req.logger = devLogger
            break;
        case 'production':
            req.logger = prodLogger
            break;
        default:
            throw new Error('Environment does not exists');
    }
    next()
}