import express, { Request, Response } from 'express';
import StoreController from '../controller/StoreController';

export const storeRouter = express.Router();
const storeController = new StoreController()

storeRouter.get('/test', async (req: Request, res: Response) => {
    try {
        await console.log('Testanto a conexão...');
        await console.log('Conexão bem-sucedida');
        res.status(200).send({ message: 'Conexão bem-sucedida!' });
    } catch (error) {
        console.log(error);
    }
});

storeRouter.post('/new', storeController.create )