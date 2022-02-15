import express, { Request, Response } from 'express';
import StoreController from '../controller/StoresController';

export const productsRouter = express.Router();
const storeController = new StoreController()


