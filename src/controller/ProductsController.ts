import express, { Request, Response } from 'express';
import ProductsBussiness from '../business/ProductsBusiness';
import ProductsDatabase from '../database/ProductsDatabase';
import { ProductInputDTO } from '../entities/Products';

export default class ProductsController {
    constructor(
        database = new ProductsDatabase(),
        business = new ProductsBussiness()
    ) {}

    async create(req: Request, res: Response){
        const {
            productName,
            brand,
            quantity,
            price
        } = req.body

        const token = req.headers.authorization as string

        const input: ProductInputDTO = {
            productName,
            brand,
            quantity,
            price,
            token
        }

    }
}
