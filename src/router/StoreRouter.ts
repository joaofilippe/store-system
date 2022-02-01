import express, { Request, Response } from 'express';
import StoreController from '../controller/StoreController';

export const storeRouter = express.Router();
const storeController = new StoreController()


storeRouter.post('/new', storeController.create )
storeRouter.post('/login', storeController.login )