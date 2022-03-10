import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config()


export default class BaseDatabase {
    PORT = Number(process.env.DB_PORT)
    protected connection = knex({
        client: 'mysql2',
        connection: {
            host: process.env.DB_HOST,
            port: this.PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
        },
    });
}
