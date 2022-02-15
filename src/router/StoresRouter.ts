import express, { Request, Response } from 'express';
import StoresController from '../controller/StoresController';

export const storesRouter = express.Router();
const storesController = new StoresController()


storesRouter.post('/signup', storesController.signup )
storesRouter.post('/login', storesController.login )
storesRouter.post('/new', storesController.create )
storesRouter.get('/search/', storesController.getStoreByEmail)
storesRouter.get('/:id', storesController.getStoreById)