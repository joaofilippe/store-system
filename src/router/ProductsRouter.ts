import express from 'express';
import ProductsController from '../controller/ProductsController';

export const productsRouter = express.Router();
const productsController = new ProductsController

productsRouter.post('/create', productsController.create)
productsRouter.get('/search/', productsController.getByStore)
productsRouter.get('/:id', productsController.getById)
productsRouter.put('/:id', productsController.update)
productsRouter.delete('/:id', productsController.delete)

