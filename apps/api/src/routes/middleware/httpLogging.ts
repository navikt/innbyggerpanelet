import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import clfDate from 'clf-date';
import morgan from 'morgan';
import config from '../../config';

function httpLogger(req: Request, res: Response, next: NextFunction) {

    const uuid = uuidv4();
    // TODO add real user
    const userId = 'userid';
    const remoteUser = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const date = clfDate(new Date());
    const { method, url, httpVersion } = req;
    const { statusCode } = res;

    const contentLength = res.get('content-length') || '-';

    const referrer = req.headers.referrer || req.headers.referer || '-';
    const userAgent = req.get('User-agent');

    console.log(`${uuid} ${userId} ${remoteUser} ${date} ${method} ${url} HTTP/${httpVersion} ${statusCode} ${contentLength} ${referrer} ${userAgent}`);
    
    next();
}

export const logger = config.backend.prod === true ? httpLogger : morgan('dev');