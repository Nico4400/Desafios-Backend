import nodemailer from 'nodemailer'
import {getVariables} from '../../config/config.js'
import processOptions from '../../utils/process.js';

const {mailingService, googleUser, googlePass} = getVariables(processOptions)

export default class MailingService{
    constructor(){
        this.client = nodemailer.createTransport({
            service: mailingService,
            port: 587,
            auth: {
                user: googleUser,
                pass: googlePass
            }
        })
    }
    
    sendSimpleMail = async ({from, to, subject, html, attachments = []}) => {
        const result = await this.client.sendMail({from, to, subject, html, attachments})
        return result
    }
}
