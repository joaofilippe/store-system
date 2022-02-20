import { Request, Response } from 'express';
import ProductsBussiness from '../business/ProductsBusiness';
import ProductsDatabase from '../database/ProductsDatabase';
import {
    GetProductsByIdDTO,
    GetProductsByStoreDTO,
    ProductInputDTO,
} from '../entities/Products';

export default class ProductsController {
    async create(req: Request, res: Response) {
        let message = 'Sucesso';
        try {
            const database = new ProductsDatabase();
            const business = new ProductsBussiness(database);
            const { productName, brand, quantity, price } = req.body;

            const token = req.headers.authorization as string;

            const input: ProductInputDTO = {
                productName,
                brand,
                quantity,
                price,
                token,
            };


            const productId = await business.create(input);
            res.send({ message, productId });
        } catch (error: any) {
            res.send(error.message);
        }
    }

    async getByStore(req: Request, res: Response) {
        let message = 'Sucesso';
        try {
            const database = new ProductsDatabase();
            const business = new ProductsBussiness(database);
            const token = req.headers.authorization as string;
            const storeId = req.query.storeId as string;

            const input: GetProductsByStoreDTO = {
                token,
                storeId,
            };

            const result = await business.getByStore(input);
            res.send({ message, result });
        } catch (error: any) {
            res.send(error.message);
        }
    }

    async getById(req: Request, res: Response) {
        let message = 'Sucesso';
        try {
            const database = new ProductsDatabase();
            const business = new ProductsBussiness(database);
            const token = req.headers.authorization as string;
            const productId = req.params.id as string;

            const input: GetProductsByIdDTO = {
                token,
                productId,
            };

            const result = await business.getById(input);


            res.send({ message, result });
        } catch (error: any) {
            res.send(error.message);
        }
    }
}
