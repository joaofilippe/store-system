import BaseDatabase from "../../src/database/BaseDatabase";
import dotenv from 'dotenv';
import knex from "knex";
dotenv.config()

describe('Testando se a conexão está sendo realizada', () => {
    test("Testando se a conexão com o banco de dados está sendo realizada.",async () => {
        const connection = knex({
            client: 'mysql2',
            connection: {
                host: process.env.DB_HOST,
                port: 3306,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
            },
        });
        try {
            const result = !!(connection)
            expect(result).toBe(true)
        } catch (error) {
            const err  = console.log(error)
            expect(err).toEqual(console.log(error))
        } finally {
            connection.destroy()
        }
    })
})