import dotenv from 'dotenv';

export const getVariables = (options) => {
    const enviroment = options.opts().mode;

    dotenv.config({
        path: enviroment === 'production' ? './src/.env.production' : './src/.env.development'
    });

    return {
        PORT: process.env.PORT,
        MONGO_URL: process.env.MONGO_URL,
        adminName: process.env.ADMIN_NAME,
        adminPassword: process.env.ADMIN_PASSWORD
    }
}