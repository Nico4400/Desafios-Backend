import dotenv from 'dotenv';

export const getVariables = (options) => {
    const environment = options.opts().mode;
    // console.log(`Environment: ${environment}`);
    dotenv.config({
        path: environment === 'production' ? './.env.production' : './.env.development'
    });

    // console.log(`PORT: ${process.env.PORT}`);
    // console.log(`MONGO_URL: ${process.env.MONGO_URL}`);
    // console.log(`adminName: ${process.env.ADMIN_NAME}`);
    // console.log(`adminPassword: ${process.env.ADMIN_PASSWORD}`);
    // console.log(`persistence: ${process.env.PERSISTENCE}`);
    // console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

    return {
        PORT: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL,
        adminName: process.env.ADMIN_NAME,
        adminPassword: process.env.ADMIN_PASSWORD,
        persistence: process.env.PERSISTENCE,
        googleUser: process.env.GOOGLE_USER,
        googlePass: process.env.GOOGLE_PASSWORD,
        mailingService: process.env.MAILING_SERVICE,
        NODE_ENV: process.env.NODE_ENV
    }
}