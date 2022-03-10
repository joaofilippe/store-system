import { Request, RequestHandler, Response } from "express";
import ProductsBussiness from "../business/ProductsBusiness";
import ProductsDatabase from "../database/ProductsDatabase";
import {
  GetProductsByIdDTO,
  GetProductsByStoreDTO,
  ProductInputDTO,
} from "../models/Product";

export default class ProductsController {
  business = new ProductsBussiness()
  async create(req: Request, res: Response) {
    let message = "Sucesso";
    try {
      const { productName, brand, quantity, price } = req.body;

      const token = req.headers.authorization as string;

      const input: ProductInputDTO = {
        productName,
        brand,
        quantity,
        price,
        token,
      };

      const productId = await this.business.create(input);
      res.send({ message, productId });
    } catch (error: any) {
      res.send(error.message);
    }
  }

  async getByStore(req: Request, res: Response) {
    let message = "Sucesso";
    try {
      const token = req.headers.authorization as string;
      const storeId = req.query.storeId as string;

      const input: GetProductsByStoreDTO = {
        token,
        storeId,
      };

      const result = await this.business.getByStore(input);
      res.send({ message, result });
    } catch (error: any) {
      res.send(error.message);
    }
  }

  async getById(req: Request, res: Response) {
    let message = "Sucesso";
    try {
      const token = req.headers.authorization as string;
      const productId = req.params.id as string;

      const input: GetProductsByIdDTO = {
        token,
        productId,
      };

      const result = await this.business.getById(input);

      res.send({ message, result });
    } catch (error: any) {
      res.send(error.message);
    }
  }

  async update(req: Request, res: Response) {
    let message = "Sucesso";
    try {
      const productId = req.params.id as string;
      const {productName, brand, quantity, price} = req.body
      const token = req.headers.authorization as string

      const productUpdateDTO = {
          productId,
          productName,
          brand,
          quantity,
          price,
          token
      }

      await this.business.update(productUpdateDTO)

      res.send(message)

    } catch (error: any) {
      res.send(error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string
      const productId = req.params.id as string

      await this.business.delete(productId, token)

      res.send({ message: 'Loja deletada com sucesso!' })
    } catch (error: any) {
      res.send(error.message)
    }
  }
}
