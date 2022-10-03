import { NextFunction, Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'
import morgan from 'morgan'
import config from '../../config'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function numberToString(n: any) {
    const str = n.toString()
    return `${str.length === 1 ? '0' : ''}${str}`
}

function getCLFOffset(date: Date) {
    const tzoffset = date.getTimezoneOffset()
    const abstzoffset = Math.abs(tzoffset)
    const op = tzoffset > 0 ? '-' : '+' // TimezoneOffset is set as subtraction from localtime to UTC,
    //    on the other hand time in CLF is shown as subtraction from UTC to localtime.
    const hour = numberToString(Math.floor(abstzoffset / 60))
    const min = numberToString(abstzoffset % 60)
    return `${op}${hour}${min}`
}

function httpLogger(req: Request, res: Response, next: NextFunction) {
    const uuid = uuidv4()
    // TODO add real user
    const userId = 'userid'
    const remoteUser = req.headers['x-forwarded-for'] || req.socket.remoteAddress

    const now = new Date()
    const day = numberToString(now.getDate())
    const month = months[now.getMonth()]
    const year = now.getFullYear()

    const hours = numberToString(now.getHours())
    const minutes = numberToString(now.getMinutes())
    const seconds = numberToString(now.getSeconds())

    const offset = getCLFOffset(now)

    const date = `${day}/${month}/${year}:${hours}:${minutes}:${seconds} ${offset}`

    const { method, url, httpVersion } = req
    const { statusCode } = res

    const contentLength = res.get('content-length') || '-'

    const referrer = req.headers.referrer || req.headers.referer || '-'
    const userAgent = req.get('User-agent')

    console.log(
        `${uuid} ${userId} ${remoteUser} ${date} ${method} ${url} HTTP/${httpVersion} ${statusCode} ${contentLength} ${referrer} ${userAgent}`,
    )

    next()
}

export const logger = config.backend.prod === true ? httpLogger : morgan('dev')
