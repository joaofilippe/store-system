import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { AddressInfo } from 'net';

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(cors);

const port = Number(process.env.PORT);

const server = app.listen(port || 3003, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(
            `Server is running in http://localhost:${address.port}`
        );
    } else {
        console.error(`Failure upon starting server.`);
    }
});

export { app, server };
