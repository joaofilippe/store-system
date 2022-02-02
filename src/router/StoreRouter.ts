import express, { Request, Response } from 'express';
import StoreController from '../controller/StoreController';

export const storeRouter = express.Router();
const storeController = new StoreController()


storeRouter.post('/signup', storeController.signup )
storeRouter.post('/login', storeController.login )
storeRouter.post('/new', storeController.create )
storeRouter.get('/search/', storeController.getStoreByEmail)
storeRouter.get('/:id', storeController.getStoreById)