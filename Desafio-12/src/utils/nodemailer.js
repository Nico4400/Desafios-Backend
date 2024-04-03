import nodemailer from 'nodemailer'
import {getVariables} from '../config/config.js'
import processOptions from './process.js';

const {googlePass} = getVariables(processOptions)

export const sendMail = async (email, ticket) => {
    const transport = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "nico.fernandezcastillo@gmail.com",
            pass: googlePass
        }
    })
    
    try {
        const result = transport.sendMail({
            from: 'Nicolas Fernandez Castillo <nico.fernandezcastillo@gmail.com>',
            to: email,
            subject: 'Restore Pasword!',
            html: `
                <div>
                    <h1>Restore Pasword</h1>
                    <p>Link: <b><a href="http://localhost:8080/api/restore-password"></b></p>
                </div>
            `
        })
    } catch (error) {
        console.log(error)
    }
}
